<!--
@component ExclusiveDurationButtons
Needs labels and names for the duration buttons that it wil hold.
This component holds mutually exclusive duration buttons. If one is active and another is clicked, the first button will
automatically stop and the second duration event will begin.
The names must be descriptive and short, as it will be used (with little modification) as db key.
-->
<script>
	import DurationButton from "./DurationButton.svelte";

	//The labels are what appear on the buttons
	//The names are what are used to identify the event internally.
	export let labels = [];
	export let names = [];

	//If dimensions are supplied, it will use the DurationButtons will use the BigButton Component
	export let width = null;
	export let height = null;

	//This is the endDuration function in all of the children Duration Buttons.
	let childrenButtons = [];

	//When one of the children buttons are pressed, this function is called.
	//The function will tell any currently activated buttons to turn off, since only one can be active at a time.
	const handleChildClick = () => {
		childrenButtons.forEach((btn) => {
			btn.endDuration();
		})
	}
</script>

<div class="wrapper">
	{#each labels as label, i}
		<DurationButton name="{names[i]}" bind:this={childrenButtons[i]} on:durationBtnPressed={handleChildClick} width="{width}" height="{height}">{label}</DurationButton>
	{/each}
</div>

<style lang="scss">
  @use '../../../css/theme.scss';

  .wrapper {
	display: inline-flex;
	flex-direction: row;
	align-content: center;
	gap:0.5em;
    background-color: theme.$light-contrast;
    border-radius: theme.$border-radius;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0.5em;
  }
</style>