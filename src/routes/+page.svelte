<script>
	import { io } from "socket.io-client";
	import InfoBar from "../components/scouter/InfoBar.svelte";
	import InputBox from "../components/scouter/InputBox.svelte"
	import {time} from "../components/time.js";
	import {onMount} from "svelte";
	import MatchReview from "../components/scouter/MatchReview.svelte";
	import {get} from "svelte/store";
	import {timeline} from "../components/scouter/timeline.js";
    import ProgressBar from "../components/scouter/ProgressBar.svelte";

	let scouterAssignment = "Unknown";
	let teamNumber = "Unknown";
	let connected = false;
	let matchNumber = 0;

	//This is bound to the value of the comment box text input.
	let commentBox;

	let pageMode = "scouting";
	const switchPageMode = () => {
		if (pageMode === "scouting") {
			pageMode = "review";
		}else {
			pageMode = "scouting";
		}
	}

	let socket;
	onMount(() => {
		//Connect to server socket.io
		socket = io(`${window.location.host}:3001`);

		socket.emit("requestScouterAssignment");
		socket.on("scouterAssignment", (assignment) => {
			scouterAssignment = assignment;
		})
		socket.on("noAssignmentAvailable", () => {
			scouterAssignment = "Full";
		})
		socket.on("teamAssignment", (teamAssignments, matchNum) => {
			teamNumber = teamAssignments[`${scouterAssignment}`];
			matchNumber = matchNum;
		})
		socket.on("timeUpdate", (newTime) => {
			time.set(newTime);
		})
		socket.on("matchOver", () => {
			//TODO: Determine if this needs to exist.
		})

		socket.on("connect", () => {
			connected = true;
		});
		socket.on("disconnect", () => {
			connected = false;
		});
	});

	//This pulls the current timeline and converts it to an object intelligently
	const convertTimelineToObj = () => {
		let timelineCopy = get(timeline);
		let matchObject = {};

		for (let i = 0; i < timelineCopy.length; i ++) {
			let event = timelineCopy[i]
			let eventType = event.constructor.name;
			let numScore = 0;
			let autonScore = 0;
			let chargestate = "nothing"

			/* Automatic Conversions of known event types */

			//Handle CountEvent
			if (eventType === "CountEvent") {
				//If counter doesn't exist in object, create it
				if (!matchObject[event.eventName]) {
					matchObject[event.eventName] = 0;
				}

				matchObject[event.eventName] += event.amount;
			}
			//Handle DurationEvent
			else if (eventType === "DurationEvent") {
				//If list of events doesn't exist yet, create it
				if (!matchObject[event.eventName]) {
					matchObject[event.eventName] = [];
				}

				matchObject[event.eventName].push(event);
			}
			//Handle MistakeEvent
			else if (eventType === "MistakeEvent") {
				//Do nothing
			}

			/* Manual Conversion of special, game-specific elements */

			//This set of functions will keep track of the points scored by the team during teleop
			if (time<135){
				if (eventType === "high"){
					numScore += 5;
				}
				else if (eventType === "middle"){
					numScore += 3;
				}
				else if (eventType === "low"){
					numScore += 2;
				}
			}
			//this set does points during auton
			if (time>135){
				if (eventType === "high"){
					numScore += 6;
					autonScore += 6;
				}
				else if (eventType === "middle"){
					numScore += 4;
					autonScore += 4;
				}
				else if (eventType === "low"){
					numScore += 3;
					autonScore += 3;
				}
			}
			//this set of functions will record the last pressed button in the charge state
			if (event.eventName === "nothing"){
				chargestate = "Nothing"
			}
			else if (event.eventName === "docked"){
				chargestate = "Docked"
			}
			else if (event.eventName === "engaged"){
				chargestate = "Engaged"
			}
			
		}
		matchObject.totalScore = numScore;
		matchObject.autonScore = autonScore;
		matchObject.finalChargeState = chargeState;

		return matchObject;
	}

	//Convert the timeline to an object and send to server.
	const matchSumbit = () => {
		let submitObj = convertTimelineToObj();
		submitObj.comment = commentBox;
		commentBox = "";

		socket.emit("matchSubmit", submitObj, teamNumber, matchNumber, scouterAssignment);
		//Clear the timeline
		timeline.set([]);
	}
</script>

<svelte:head>
	<title>FRC Scouting</title>
</svelte:head>

<main>
	<InfoBar teamNumber={teamNumber} scouterID={scouterAssignment} connected={connected}/>
	<ProgressBar></ProgressBar>
	{#if pageMode == "scouting"}
		<!--This is where all the input and buttons are.-->
		<InputBox on:switchPageMode={switchPageMode}/>
	{:else}
		<!--This is where the scouter reviews their inputs and submits it.-->
		<MatchReview on:switchPageMode={switchPageMode} on:matchSubmit={matchSumbit} bind:commentBox bind:connected/>
	{/if}
</main>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, Tahoma ,'Segoe UI', Roboto, Oxygen,
        Ubuntu,'Helvetica Neue', sans-serif;
    }
    main {
        height: 95vh;
    }
</style>
