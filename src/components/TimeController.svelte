<script>
	import {createEventDispatcher, onDestroy} from "svelte";
	import {time} from "./time.js";
	import {Button} from "attractions";

	const dispatch = createEventDispatcher();

	let interval;
	//Helper function that runs a given callback function every x milliseconds
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
		time.update(n => n - 1);
	}

	const resetTimer = () => {
		time.set(150);
		clearInterval(interval);
	}

	const abortMatch = () => {
		clearInterval(interval);
		dispatch('matchOver');
	}

	time.subscribe(value => {
		if (value <= 0) {
			clearInterval(interval);
			dispatch('matchOver');
		}
	})
</script>

<div class="wrapper">
	<h1>Timer</h1>
	<Button filled on:click={startTimer}>Start Timer</Button>
	<Button outline on:click={abortMatch}>End Match Early</Button>
	<Button outline on:click={resetTimer}>Reset Timer</Button>
</div>

<style lang="scss">
  @use '../css/theme.scss';

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
	justify-content: center;
	gap: 1em;
    background-color: theme.$light-contrast;
    border-radius: theme.$border-radius;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 1em;
  }
</style>