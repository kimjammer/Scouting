<!--
@component SequentialEvents
Needs names for the event buttons it will hold.
Needs the type of button it will use: Counter, SingleEvent (default), or StateToggle.
This component holds a series of buttons that can only be pressed in sequence.
The names must be descriptive and short, as it will be used (with little modification) as db key.
-->
<script>
	import StateToggle from "../StateComponents/StateToggle.svelte";
	import Counter from "./Counter.svelte";
	import SingleEventButton from "./SingleEventButton.svelte";
	import {onMount} from "svelte";

	//The names appear on the buttons and will be converted into the internal label.
	export let names = [];
	export let type = "SingleEvent";

	//This is the endDuration function in all the children Buttons.
	let childrenButtons = [];

	//When one of the children buttons are pressed, this function is called.
	//Tell the next button to unlock
	const handleChildClick = (id) => {
		//Don't do anything if this is the last button
		if (id === childrenButtons.length - 1) return;

		//Enable the next button
		childrenButtons[id+1].isDisabled = false;
	}

	onMount(() => {
		//Set the first button to be unlocked
		childrenButtons[0].isDisabled = false;

		//Set the rest of the button to be disabled
		for(let i = 1; i < childrenButtons.length; i++){
			childrenButtons[i].isDisabled = true;
		}
	});

</script>

<div class="wrapper">
	{#each names as name, i}
		{#if type==="Counter"}
			<Counter name="{name}" bind:this={childrenButtons[i]} on:click={()=> {handleChildClick(i)}}>{name}</Counter>
		{:else if type==="SingleEvent"}
			<SingleEventButton name="{name}" bind:this={childrenButtons[i]} on:click={()=> {handleChildClick(i)}}>{name}</SingleEventButton>
		{:else if type==="StateToggle"}
			<StateToggle name="{name}" bind:this={childrenButtons[i]} on:click={()=> {handleChildClick(i)}}></StateToggle>
		{/if}
	{/each}
</div>

<style lang="scss">
  @use '../../../css/theme.scss';

  .wrapper {
    display: inline-flex;
    flex-direction: column;
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