<script>
	import {H2, Headline} from "attractions";
	import {onMount} from "svelte";
	export let socket;


	//The current mode, SingleMatch or Average
	let mode = "";
	let statistics = {};

	onMount(() => {
		//This code snippet waits for the socket to become defined by the parent before setting up functions
		(async() => {
			//While the variable is undefined, check again every 100ms
			while(!socket)
				await new Promise(resolve => setTimeout(resolve, 100));
			//If code reaches this point, the socket is defined

			//When the stats for 1 match is received, update the UI
			socket.on("matchStats", stats => {
				statistics = stats;
				mode = "SingleMatch";
			});

			//When the stats for the average of all matches is received, update the UI
			socket.on("averageStats", stats => {
				statistics = stats;
				mode = "Average";
			});
		})();

	});
</script>

<div class="wrapper">
	{#if mode === ""}
		<Headline>Statistics</Headline>
	{:else}
		<Headline>Team {statistics.teamNum} Statistics</Headline>
	{/if}
	
	<div class="infoContainer">
		{#if mode === "SingleMatch"}
			<div class="info">
				Points Scored: {statistics.totalPoints || "Unknown"}
			</div>
			<div class="info">
				Object Points in Auton: {statistics.autonPoints || "Unknown"}
			</div>
			<div class = "info">
				 High Cones : {statistics.coneHigh || "Unkown"}
			</div>
			<div class = "info">
				Mid Cones : {statistics.coneMid || "Unkown"}
			</div>
			<div class = "info">
				 Low Cones  : {statistics.coneLow || "Unkown"}
			</div>
			<div class = "info">
				 High cubes : {statistics.cubeHigh || "Unkown"}
			</div>
			<div class = "info">
				 Mid cubes : {statistics.cubeMid || "Unkown"}
			</div>
			<div class = "info">
				Low cubes : {statistics.cubeLow || "Unkown"}
			</div>
			<div class = "info">
				Cones Scored: {statistics.coneCount || "Unknown"}
			</div>
			<div class = "info">
				Cubes Scored: {statistics.cubeCount || "Unknown"}
			</div>
			<div class="info">
				Scored High: {statistics.highScore || "Unknown"}
			</div>
			<div class="info">
				Scored Middle: {statistics.middleScore || "Unknown"}
			</div>
			<div class="info">
				Scored Low: {statistics.lowScore || "Unknown"}
			</div>
			<div class="info">
				Cycle Time: {statistics.cycleTime || "Unknown"} Seconds/Object
			</div>
			<div class="info">
				Final Charging Station State: {statistics.finalState || "Unknown"}
			</div>
			<div class="info comment">
				Comment: <br>
				{statistics.comment || "None"}
			</div>
		{:else if mode === "Average"}
			<div class="info">
				Average Points Scored: {statistics.avgTotalPoints || "Unknown"}
			</div>
			<div class="info">
				Average Object Points Scored in Auton: {statistics.avgAutonPoints || "Unknown"}
			</div>
			<div class = "info">
				Average High Cones : {statistics.avgConeHigh || "Unkown"}
			</div>
			<div class = "info">
				Average Mid Cones : {statistics.avgConeMid || "Unkown"}
			</div>
			<div class = "info">
				Average Low Cones  : {statistics.avgConeLow || "Unkown"}
			</div>
			<div class = "info">
				Average High cubes : {statistics.avgCubeHigh || "Unkown"}
			</div>
			<div class = "info">
				Average Mid cubes : {statistics.avgCubeMid || "Unkown"}
			</div>
			<div class = "info">
				Average Low cubes : {statistics.avgCubeLow || "Unkown"}
			</div>
			<div class = "info">
				Average Cones Scored: {statistics.avgConeCount || "Unknown"}

			</div>
			<div class = "info">
				Average Cubes Scored: {statistics.avgCubeCount || "Unknown"}
			</div>
			<div class="info">
				Average Scored High: {statistics.avgHighScore || "Unknown"}
			</div>
			<div class="info">
				Average Scored Middle: {statistics.avgMiddleScore || "Unknown"}
			</div>
			<div class="info">
				Average Scored Low: {statistics.avgLowScore || "Unknown"}
			</div>
			<div class="info">
				Average Cycle Time: {statistics.avgCycleTime || "Unknown"} Seconds/Object
			</div>
			<div class="info">
				Most Common Charging Station State: {statistics.modeFinalState || "Unknown"}
			</div>
			<div class="info comment">
				Comments From Matches: <br>
			 {statistics.comment || "None"}
			</div>
		{:else}
			<H2>No Match Selected</H2>
		{/if}
	</div>
</div>

<style lang="scss">
  @use '../css/theme.scss';

  .wrapper {
    margin-top: 1em;
    background-color: theme.$secondary-color;
    border-radius: theme.$border-radius;

    padding: 1em;
    border-radius: theme.$border-radius;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

	max-width: 50vw;
    height: 80vh;
	
  }

  .infoContainer {
	overflow-y: scroll;
	height: 68vh;
	border-radius: theme.$border-radius;
  }

  .info {
	color: white;
	padding: 0.5em;
	font-family: theme.$font;

	background-color: theme.$main;
	
	border-radius: theme.$border-radius;
	margin-top: 0.5em;
  }

  .comment {
	overflow-wrap: break-word;
	overflow: auto;
	white-space: pre-wrap;
  }
</style>