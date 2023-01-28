<script>
	import {Headline} from "attractions";
	import {onMount} from "svelte";
	export let socket;

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
				console.log(stats);
			});

			//When the stats for the average of all matches is received, update the UI
			socket.on("averageStats", stats => {

			});
		})();

	});
</script>

<div class="wrapper">
	<Headline>Statistics</Headline>
	
	<div class="info">
		Points Scored: {statistics.totalPoints || "Unknown"}
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
		Cycle Time: {statistics.cycleTime || "Unknown"} Objects/Second
	</div>
	<div class="info">
		Final Charging Station State: {statistics.finalState || "Unknown"}
	</div>
	<div class="info">
		Comment: {statistics.comment || "None"}
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

    height: 80vh;
  }

  .info {
	color: white;
	padding: 0.5em;
	font-family: theme.$font;

	background-color: theme.$main;
	width: 75%;
	border-radius: theme.$border-radius;
	margin-top: 0.5em;
  }

</style>