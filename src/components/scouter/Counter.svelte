<!--
@component Incrementer
Needs a label and amount to increment/decrement by.
-->
<script>
	import {Button} from "attractions";
	import {CountEvent} from "./CountEvent.js";
	import {timeline} from './timeline.js';
	import {time} from '../time.js';

	export let label = "Unknown";
	export let amount = 0;

	//Get updates when the time changes.
	let timestamp = 0;
	time.subscribe(value => {
		timestamp = value;
	})

	const handleClick = () => {
		const event = new CountEvent(timestamp, amount);
		//Append to the writable store
		$timeline = [...$timeline, event]
	};
</script>

<Button filled on:click={handleClick}>{label}</Button>

<style lang="scss">

</style>