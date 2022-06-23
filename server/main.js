import  mongoose  from "mongoose";
import { Server } from "socket.io";
import {getKeyByValue} from "./utils.js";
import {oneMatchStats} from "./stats.js";

//Import database schemas
import Team from "./models/teamModel.js";
import Match from "./models/matchModel.js";
import TeamMatch from "./models/teamMatchModel.js";

//Connect to mongodb database
const dbURI = 'mongodb://localhost/FRCScouting'
mongoose.connect(dbURI)
	.then(result => {
		console.log('Connected to db')
	})
	.catch(err => {
		console.log(err);
	})

//Create Socket.io server
const io = new Server(3001, { cors: {origin: "*"} });
const adminNetwork = io.of("/admin")
const statsNetwork = io.of("/stats")

//Table recording which scouter ids are taken by which scouter (identified by socket.id)
let scouterAssignments = {
	R1: null,
	R2: null,
	R3: null,
	B1: null,
	B2: null,
	B3: null,
};

//New main network connection
io.on("connection", (socket) => {
	//Debug statement
	console.log("Client connected");

	/*The server listens for the following messages and reacts accordingly*/

	//Give new scouter its assignment
	socket.on("requestScouterAssignment", (args) => {
		let assignment = getKeyByValue(scouterAssignments,null)

		//If all spots are full, tell scouter that.
		if (!assignment){
			socket.emit("noAssignmentAvailable");
		}else{
			socket.emit("scouterAssignment", assignment);
			scouterAssignments[`${assignment}`] = socket.id;
		}

		//Let the admin know a different amount of scouters is connected.
		adminNetwork.emit("scouterStatusUpdate",scouterAssignments);
	});

	//Save teamMatch data received from scouter to database;
	socket.on("matchSubmit", async (matchData, teamNum, matchNum, teamAssignment) => {

		//Check if team and match exist.
		//They should've been created, so if they aren't, log that and stop running.
		if (Team.exists({teamNumber: teamNum}) && Match.exists({matchNumber: matchNum})) {
			let teamDoc = await Team.findOne({teamNumber: teamNum});
			let matchDoc = await Match.findOne({matchNumber: matchNum});

			//Save teamMatch
			const teamMatchDoc = new TeamMatch({
				team: teamDoc._id,
				match: matchDoc._id,
				position: teamAssignment,
				data: matchData
			});
			await teamMatchDoc.save();

			//Update team's matches array
			teamDoc.matches.push(teamMatchDoc._id);
			await teamDoc.save();

			//Update match's teamMatch field
			matchDoc[`${teamAssignment}`].teamMatch = teamMatchDoc._id;
			await matchDoc.save();
		}else{
			console.error("ERROR: Team and or Match for submitted teamMatch not found in DB");
		}
	})

	//Handle client disconnection
	socket.on("disconnect", (reason) => {
		console.log("Client disconnected");

		//Free up disconnected scouter's assignment
		let oldAssignment = getKeyByValue(scouterAssignments, socket.id);
		if (oldAssignment) {
			scouterAssignments[`${oldAssignment}`] = null;
			adminNetwork.emit("scouterStatusUpdate",scouterAssignments);
		}
	});
});

//New admin network connection
adminNetwork.on("connection", (socket) => {
	console.log("Admin Connected");

	/*The server listens for the following admin messages and reacts accordingly*/

	//When the admin requests the current scouter status, give it to them.
	socket.on("requestScouterStatus", (args) => {
		adminNetwork.emit("scouterStatusUpdate",scouterAssignments);
	});

	//When the admin sends the team number assignments for the scouters, forward that to the scouters.
	socket.on("teamAssignment", async (teamAssignments, matchNum) => {
		io.emit('teamAssignment', teamAssignments, matchNum);

		//Go through the teams and create their database entry if they don't exist.
		for (const teamNum of Object.values(teamAssignments)) {
			//Check if team exists
			if (!await Team.exists({teamNumber: teamNum})) {
				//If not, create it.
				const team = new Team({teamNumber: teamNum});
				await team.save();
			}
		}

		//If match doesn't exist, create it.
		if (!await Match.exists({matchNumber: matchNum})) {
			const matchDoc = new Match({
				matchNumber: matchNum,
			})
			matchDoc.R1.team = (await Team.findOne({teamNumber: teamAssignments['R1']}))._id,
			matchDoc.R2.team = (await Team.findOne({teamNumber: teamAssignments['R2']}))._id,
			matchDoc.R3.team = (await Team.findOne({teamNumber: teamAssignments['R3']}))._id,
			matchDoc.B1.team = (await Team.findOne({teamNumber: teamAssignments['B1']}))._id,
			matchDoc.B2.team = (await Team.findOne({teamNumber: teamAssignments['B2']}))._id,
			matchDoc.B3.team = (await Team.findOne({teamNumber: teamAssignments['B3']}))._id,

			await matchDoc.save();
		}
		//If match exists, update the participating teams.
		else {
			let matchDoc = await Match.findOne({matchNumber: matchNum});
			matchDoc.R1.team = (await Team.findOne({teamNumber: teamAssignments['R1']}))._id;
			matchDoc.R2.team = (await Team.findOne({teamNumber: teamAssignments['R2']}))._id;
			matchDoc.R3.team = (await Team.findOne({teamNumber: teamAssignments['R3']}))._id;
			matchDoc.B1.team = (await Team.findOne({teamNumber: teamAssignments['B1']}))._id;
			matchDoc.B2.team = (await Team.findOne({teamNumber: teamAssignments['B2']}))._id;
			matchDoc.B3.team = (await Team.findOne({teamNumber: teamAssignments['B3']}))._id;
			await matchDoc.save();
		}

	})

	//When the admin sends a time update, relay to scouters
	socket.on('timeUpdate', (matchTime) => {
		io.emit('timeUpdate', matchTime);
	})

	//When the admin declares the match is over, relay to scouters
	socket.on('matchOver', () => {
		io.emit('matchOver');
	})
});

//New stats network connection
statsNetwork.on("connection", (socket) => {
	console.log("Stats Connected");

	/*The server listens for the following stats messages and reacts accordingly*/

	//When the list of teams is requested, grab it from the database and send it to the client.
	socket.on("requestTeams", async (args) => {
		let teamList = await Team.find({});
		socket.emit("teamList", teamList);
	});

	//When the list of matches is requested, grab it from the database and send it to the client.
	socket.on("requestMatches", async (teamNum) => {
		let teamDoc = await Team.findOne({teamNumber: teamNum});
		let teamMatchList = await TeamMatch.find({team: teamDoc._id});

		//Go through the teamMatches and find the matches they're in.
		let matchList = [];
		for (const teamMatch of teamMatchList) {
			let match = await Match.findById(teamMatch.match);
			matchList.push(match);
		}

		socket.emit("matchList", teamNum);
	});

	//When the statistics for 1 match is requested, get it and send it to the client.
	socket.on("requestMatchStats", async (matchNum, teamNum) => {
		let teamDoc = await Team.findOne({teamNumber: teamNum});
		let matchDoc = await Match.findOne({matchNumber: matchNum});
		let teamMatch = await TeamMatch.findOne({match: matchDoc._id, team: teamDoc._id});

		let stats = oneMatchStats(teamMatch);

		socket.emit("matchStats", stats);
	});

	//When the statistics for the average of all matches is requested, get it and send it to the client.
	socket.on("requestAverageStats", async (teamNum) => {
		let teamDoc = await Team.findOne({teamNumber: teamNum});
		let teamMatchList = [];
		let teamMatchIDs = teamDoc.matches;
		for (const matchID of teamMatchIDs) {
			teamMatchList.push(await TeamMatch.findById(matchID));
		}

		let stats = averageStats(teamMatchList);

		socket.emit("averageStats", stats);
	});
});

console.log("Server Initialized.");