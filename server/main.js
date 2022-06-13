import { Server } from "socket.io";
import {getKeyByValue} from "./utils.js";

const io = new Server(3001, { cors: {origin: "*"} });
const adminNetwork = io.of("/admin")

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
	socket.on("teamAssignment", (teamAssignments) => {
		io.emit('teamAssignment', teamAssignments);
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

console.log("Server Initialized.");