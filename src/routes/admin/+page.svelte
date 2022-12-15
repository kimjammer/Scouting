<script>
	import { io } from "socket.io-client";
	import AdminInfoBar from "../../components/AdminInfoBar.svelte";
	import MatchQueuer from "../../components/MatchQueuer.svelte";
	import {onMount} from "svelte";
	import TimeController from "../../components/TimeController.svelte";
	import {time} from "../../components/time.js";

	let scouterAssignments;

	let mainNetwork;
	let adminNetwork;
	onMount(() => {
		//Connect to main and admin server socket.io
		mainNetwork = io(`${window.location.host}:3001`);
		adminNetwork = io(`${window.location.host}:3001/admin`);

		//Request scouter status on first load
		adminNetwork.emit("requestScouterStatus");

		//Receive updates on scouter connections
		adminNetwork.on("scouterStatusUpdate", (newScouterAssignments) => {
			scouterAssignments = newScouterAssignments;
		});

		//This runs everytime the current match time changes.
		time.subscribe((value) => {
			adminNetwork.emit('timeUpdate', $time);
		})
	});

	const teamAssignment = (event) => {
		adminNetwork.emit('teamAssignment', event.detail.teamAssignments, event.detail.matchNum)
	}

	const broadcastMatchOver = () => {
		adminNetwork.emit('matchOver');
	}

</script>

<svelte:head>
	<title>FRC Scouting Admin</title>
</svelte:head>

<main>
	<AdminInfoBar bind:scouterAssignments={scouterAssignments}/>
	<div class="contentBox">
		<MatchQueuer on:queueTeams={teamAssignment}/>
		<TimeController on:matchOver={broadcastMatchOver}/>
	</div>
</main>


<style lang="scss">
  :root {
    font-family: -apple-system, BlinkMacSystemFont, Tahoma ,'Segoe UI', Roboto, Oxygen,
    Ubuntu,'Helvetica Neue', sans-serif;
  }
  main {
    height: 95vh;
  }
  .contentBox {
	display: flex;
	justify-content: center;
	gap: 1em;
  }
</style>