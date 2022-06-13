<script>
	import { io } from "socket.io-client";
	import InfoBar from "../components/InfoBar.svelte";
	import InputBox from "../components/scouter/InputBox.svelte"
	import {onMount} from "svelte";

	let scouterAssignment = "Unknown";
	let teamNumber = "Unknown";
	let connected = false;
	let matchTime = 0;

	onMount(() => {
		//Connect to server socket.io
		const socket = io(`${window.location.host}:3001`);

		socket.emit("requestScouterAssignment");
		socket.on("scouterAssignment", (assignment) => {
			scouterAssignment = assignment;
		})
		socket.on("noAssignmentAvailable", () => {
			scouterAssignment = "Full";
		})
		socket.on("teamAssignment", (teamAssignments) => {
			teamNumber = teamAssignments[`${scouterAssignment}`];
		})
		socket.on("timeUpdate", (time) => {
			matchTime = time;
		})
		socket.on("matchOver", () => {
			//TODO: Compile timeline into object and send to server.
		})

		socket.on("connect", () => {
			connected = true;
		});
		socket.on("disconnect", () => {
			connected = false;
		});
	});
</script>

<main>
	<InfoBar teamNumber={teamNumber} scouterID={scouterAssignment} connected={connected} matchTime={matchTime}/>
	<InputBox/>
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
