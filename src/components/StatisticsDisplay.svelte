<script>
	import {Headline} from "attractions";
	import {onMount} from "svelte";
	export let socket;

	onMount(() => {
		//This code snippet waits for the socket to become defined by the parent before setting up functions
		(async() => {
			//While the variable is undefined, check again every 100ms
			while(!socket)
				await new Promise(resolve => setTimeout(resolve, 100));
			//If code reaches this point, the socket is defined

			//When the stats for 1 match is received, update the UI
			socket.on("matchStats", stats => {

			});

			//When the stats for the average of all matches is received, update the UI
			socket.on("averageStats", stats => {

			});
		})();

	});
</script>

<div class="wrapper">
	<Headline>Statistics</Headline>
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
</style>