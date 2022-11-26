<!--
@component SingleEventButton
Needs names for the single event that it fires.
This button will add a singleEvent to the timeline. These events should only be fired once per match, usually for things
like endgame. Button will disable itself, but it can be reenabled by changing isDisabled.
The names must be descriptive and short, as it will be used (with little modification) as db key.
-->
<svelte:options accessors={true}/>
<script>
	import {Button} from "attractions";
	import {SingleEvent} from "../../classes/SingleEvent.js"
	import {timeline} from '../timeline.js';
	import {time} from '../../time.js';

	export let name = "Unknown";

	//The internal event name is the label lowercase and all spaces replaced with underscores.
	//"High Goal" becomes "high_goal"
	const eventName = name.replaceAll(' ','_').toLowerCase();

	export let isDisabled = false;
	export let parentClickHandler = () => {};

	const handleClick = () => {
		const event = new SingleEvent(eventName, $time);
		//Append to the writable store
		$timeline = [...$timeline, event]
		isDisabled = true;

		//If the parent added its click handler, run it
		parentClickHandler();
	};

</script>

<Button filled on:click={handleClick} on:click disabled={isDisabled}>
	<slot></slot>
</Button>

<style lang="scss">

</style>