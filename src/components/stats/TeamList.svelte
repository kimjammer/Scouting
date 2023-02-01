<script>
	import {Button, Headline} from "attractions";
	import {onMount} from "svelte";

	export let socket;
	let teams = [];

	onMount(() => {
		//This code snippet waits for the socket to become defined by the parent before setting up functions
		(async() => {
			//While the variable is undefined, check again every 100ms
			while(!socket)
				await new Promise(resolve => setTimeout(resolve, 100));
			//If code reaches this point, the socket is defined


			//Request list of teams from server
			socket.emit("requestTeams");

			//Listen for teams from server
			socket.on("teamList", (teamList) => {
				teams = teamList;
			});
		})();
	})

	const handleTeamSelect = (team) => {
		socket.emit("requestMatches", team.teamNumber);
	}

</script>

<div class="wrapper">
	<Headline>Teams:</Headline>

	{#each teams as team}
		<Button small on:click={() => handleTeamSelect(team)}>
			{team.teamNumber}
		</Button>
	{/each}
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

  /*
  .teamNumber {
	margin: 0.3em;
	font-size: larger;
  }
  */


</style>