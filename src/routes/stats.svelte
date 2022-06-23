<script>
	import io from "socket.io-client";
	import TeamList from "../components/TeamList.svelte";
	import StatsInfoBar from "../components/StatsInfoBar.svelte";
	import MatchChooser from "../components/MatchChooser.svelte";
	import StatisticsDisplay from "../components/StatisticsDisplay.svelte";
	import {onMount} from "svelte";

	let socket;
	let connected = false;
	onMount(() => {
		//Connect to server socket.io
		//This socket object is passed down to the children, who will use it to get data from the server.
		socket = io(`${window.location.host}:3001/stats`);


		//Set connected to true when the socket is connected.
		socket.on("connect", () => {
			connected = true;
		});
		//Set connected to false when the socket is disconnected.
		socket.on("disconnect", () => {
			connected = false;
		});
	});

</script>

<svelte:head>
	<title>FRC Scouting Statistics</title>
	<html lang="en" />
</svelte:head>

<main>
	<StatsInfoBar bind:connected={connected}/>
	<div class="content">
		<TeamList socket={socket}/>
		<MatchChooser socket={socket}/>
		<StatisticsDisplay/>
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

  .content{
	display: flex;
	gap: 0.5em;
  }
</style>