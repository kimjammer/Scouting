<script>
	import {Button, H1, H2, Headline} from "attractions";
	import {onMount} from "svelte";

	export let socket;
	let matches = [];
	let listAvailable = false;
	let teamNumber;

	onMount(() => {
		//This code snippet waits for the socket to become defined by the parent before setting up functions
		(async() => {
			//While the variable is undefined, check again every 100ms
			while(!socket)
				await new Promise(resolve => setTimeout(resolve, 100));
			//If code reaches this point, the socket is defined

			//When the match list is received, updated the matches variable to show the user.
			socket.on("matchList", (matchList, teamNum) => {
				matches = matchList;
				teamNumber = teamNum;
				listAvailable = true;
			});
		})();

	});

	//Send event to get statistics of this match
	const handleMatchSelect = (match) => {
		socket.emit("requestMatchStats", match.matchNumber, teamNumber);
	}

	//Send event to get statistics of average of all matches
	const handleAverageSelect = () => {
		socket.emit("requestAverageStats", teamNumber);
	}
</script>

<div class="wrapper">
	<Headline>Choose Match:</Headline>

	{#if listAvailable}
		<Button small on:click="{handleAverageSelect}">
			<H1>Average</H1>
		</Button>
		{#each matches as match}
			<Button small on:click={() => handleMatchSelect(match)}>
				<H2>{match.matchNumber}</H2>
			</Button>
		{/each}
	{:else}
		<H2>No Team Selected</H2>
	{/if}
	
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
    overflow-y: scroll;
  }
</style>