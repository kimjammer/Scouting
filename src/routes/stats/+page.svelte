<script>
	import io from "socket.io-client";
	import { onMount } from "svelte";
	import { Button } from "attractions";
	import MatchChooser from "../../components/stats/MatchChooser.svelte";
	import StatisticsDisplay from "../../components/stats/StatisticsDisplay.svelte";
	import StatsInfoBar from "../../components/stats/StatsInfoBar.svelte";
	import TeamList from "../../components/stats/TeamList.svelte";

	let socket;
	let connected = false;

	let downloadContainer;

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

		//When we recieve a stats csv download, initiate a download
		socket.on("statsDownload", (CSVstring) => {
			const element = document.createElement('a');

			element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(CSVstring));
			element.setAttribute('download', "ScoutingData.csv");

			element.style.display = 'none';
			downloadContainer.appendChild(element);

			element.click();

			downloadContainer.removeChild(element);
		})
	});

	const handleDownload = () => {
		socket.emit("requestStatsDownload");
	}

</script>

<svelte:head>
	<title>FRC Scouting Statistics</title>
</svelte:head>

<main>
	<StatsInfoBar bind:connected={connected}/>
	<div class="content">
		<TeamList socket={socket}/>
		<MatchChooser socket={socket}/>
		<StatisticsDisplay socket={socket}/>
		<div><Button filled on:click={handleDownload}>Download CSV</Button></div>
	</div>
	<div bind:this={downloadContainer}></div>
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
	align-items: end;
	gap: 0.5em;
  }
</style>