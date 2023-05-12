<!--
@component Incrementer
Needs a name and amount to increment/decrement by.
The name must be descriptive and short, as it will be used (with little modification) as db key.
-->
<svelte:options accessors={true}/>
<script>
	import { Button } from "attractions";
	import { CountEvent } from "../../classes/CountEvent.js";
	import { time } from '../../time.js';
	import BigButton from "../custom/BigButton.svelte";
	import { timeline } from '../timeline.js';

	export let name = "Unknown";
	export let amount = 0;
	export let isDisabled = false;
	let changeColor = true; 
	let classChange = " ";

	//If dimensions are supplied, it will use the BigButton Component
	export let width = null;
	export let height = null;

	//The internal event name is the label lowercase and all spaces replaced with underscores.
	//"High Goal" becomes "high_goal"
	const eventName = name.replaceAll(' ','_').toLowerCase();

	const handleClick = () => {
		const event = new CountEvent(eventName, $time, parseInt(amount));
		//Append to the writable store
		$timeline = [...$timeline, event]
	};
</script>

<!--This button will both handle and forward the click event.-->
{#if width != null}
	<div class = {classChange}>
		<BigButton on:click={handleClick} on:click disabled={isDisabled} width="{width}" height="{height}" filled>
		<slot></slot>
	</BigButton>
	</div>
{:else}
<div class = {classChange}>
	<Button filled on:click={handleClick} on:click disabled={isDisabled}>
		<slot></slot>
	</Button>
	</div>
{/if}


<style lang="scss">
.no { 
	color : red; 
}
.yes { 
	color : #005035;
}
</style>