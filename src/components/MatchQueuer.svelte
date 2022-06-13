<script>
	import {Button, TextField} from "attractions";
	import {createEventDispatcher} from "svelte";

	const teamIDs = ['R1','R2','R3','B1','B2','B3'];

	//This objects shows which scouter will get which team number. For example, Red 1 is team 1747, etc...
	let teamAssignments = {
		R1: null,
		R2: null,
		R3: null,
		B1: null,
		B2: null,
		B3: null,
	};

	const dispatch = createEventDispatcher();
	const queueMatch = () => {
		//Creates an event to tell the parent element (admin.svelte) to tell the server the team assignments.
		dispatch('queueTeams', {
			teamAssignments: teamAssignments,
		});
	}

</script>

<div class="wrapper">
	<h1>Match Queuer</h1>

	<div class="teamInput">
		{#each teamIDs as teamID}
			<div class="entryArea" class:red="{teamID[0] === 'R'}" class:blue="{teamID[0] === 'B'}">
				<!--Set the label to the team id. Bind the current value (input) of the field to the team assignments object,
				with the proper key (R1, B2, etc) provided by the each loop.-->
				<TextField outline noSpinner label={teamID} type="number" bind:value={teamAssignments[`${teamID}`]}></TextField>
			</div>
		{/each}
	</div>

	<TextField outline noSpinner label="Match Number" type="number"></TextField>
	<br>
	<Button filled on:click={queueMatch}>Queue Match</Button>
</div>

<style lang="scss">
  @use '../css/theme.scss';

  .wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: theme.$light-contrast;
	border-radius: theme.$border-radius;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
	padding: 1em;
	width: 50%;
  }
  .teamInput {
	display: grid;
	grid-auto-flow: column;
	gap: 1em;
	width: 80%;
	grid-template-rows: 1fr 1fr 1fr;

	margin: 2em 2em 2em 2em;
  }
  .entryArea{
	width: 100%;
  }
  .red {
	background-color: #ff4141;
	border-radius: theme.$border-radius;
  }
  .blue {
	background-color: #4242ff;
	border-radius: theme.$border-radius;
  }
</style>