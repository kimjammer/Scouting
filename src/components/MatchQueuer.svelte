<script>
	import {Button, TextField} from "attractions";
	import {time} from 'time.js';
	import {onDestroy} from "svelte";

	const teamIDs = ['R1','R2','R3','B1','B2','B3']

	const queueMatch = () => {
		//Reset Timer
		time.set(150);

		//Send Scouters their team assignment
		//TODO: Implement sending team assignment to scouters
	}

	//Helper function that runs a given callback function every x milliseconds
	let interval;
	export function onInterval(callback, milliseconds) {
		interval = setInterval(callback, milliseconds);

		onDestroy(() => {
			clearInterval(interval);
		});
	}

	//Timer tick interval in ms
	const timerInterval = 1000;
	const startTimer = () => {
		onInterval(tickTimer, timerInterval);
	}

	const tickTimer = () => {
		time.update(n => n + 1)
	}

</script>

<div class="wrapper">
	<h1>Timer</h1>
	<Button outline>Start Timer</Button>

	<div class="teamInput">
		{#each teamIDs as teamID}
			<div class="entryArea" class:red="{teamID[0] === 'R'}" class:blue="{teamID[0] === 'B'}">
				<TextField outline noSpinner label={teamID} type="number"></TextField>
			</div>
		{/each}
	</div>

	<TextField outline noSpinner label="Match Number" type="number"></TextField>
	<br>
	<Button filled on:click={queueMatch}>Queue Match</Button>
	<Button filled on:click={startTimer}>Start Timer</Button>
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