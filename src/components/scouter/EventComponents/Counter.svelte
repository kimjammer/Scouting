<!--
@component Incrementer
Needs a name and amount to increment/decrement by.
The name must be descriptive and short, as it will be used (with little modification) as db key.
-->
<svelte:options accessors={true}/>
<script>
	import {Button} from "attractions";
	import {CountEvent} from "../../classes/CountEvent.js";
	import {timeline} from '../timeline.js';
	import {time} from '../../time.js';

	export let name = "Unknown";
	export let amount = 0;
	export let isDisabled = false;

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
<Button filled on:click={handleClick} on:click disabled={isDisabled}>
	<slot></slot>
</Button>

<style lang="scss">

</style>