<script>
	import { io } from "socket.io-client";
	import InfoBar from "../components/InfoBar.svelte";
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

			//None in the barebones example, place custom code here.
		}

		return matchObject;
	}

	//Convert the timeline to an object and send to server.
	const matchSumbit = () => {
		socket.emit("matchSubmit", convertTimelineToObj(), teamNumber, matchNumber, scouterAssignment);
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
		<MatchReview on:switchPageMode={switchPageMode} on:matchSubmit={matchSumbit}/>
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
