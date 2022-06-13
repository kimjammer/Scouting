<!--
@component DurationButton
Needs a label.
The label must be descriptive and short, as it will be used (with little modification) as db key.
-->
<script>
	import {Button} from "attractions";
	import {DurationEvent} from "../classes/DurationEvent.js";
	import {timeline} from './timeline.js';
	import {time} from '../time.js';
	import {createEventDispatcher} from "svelte";

	const dispatch = createEventDispatcher();
	//If this button is being used as part of a mutually exclusive set, this variable remembers whether it was this
	//button that just got activated, so it doesn't turn off when the parent tells all the buttons to turn off.
	let isExclusivityDispatcher = false;

	export let name = "Unknown";

	//The internal event name is the label lowercase and all spaces replaced with underscores.
	//"High Goal" becomes "high_goal"
	const eventName = name.replaceAll(' ','_').toLowerCase();

	//Variables that keep track of the button's status
	let inProgress = false;
	let startTime = 0;
	let endTime = 0;

	//If the parent component (ExclusiveDurationButtons) calls this function, the button will end its current event
	//if there is one running.
	export const endDuration = () => {
		console.log(name + " recieved command to stop. Am i the dispatcher?: " + isExclusivityDispatcher);
		if (inProgress && !isExclusivityDispatcher){
			processDurationEnd();
		}
		isExclusivityDispatcher = false;
	}

	const handleClick = () => {
		if (!inProgress){
			//There is no event in progress, so start tracking a new one
			inProgress = true;
			startTime = $time;
			console.log(name + " starting duration")

			//Send event telling the parent (ExclusiveDurationButtons) (if one exists) that this button was clicked,
			//so it can tell the other buttons to turn off.
			isExclusivityDispatcher = true;
			dispatch('durationBtnPressed');
		}else{
			//If there was an event in progress, it has just ended, process it.
			processDurationEnd();
		}
	};

	const processDurationEnd = () => {
		console.log(name + " ending duration")
		inProgress = false;
		endTime = $time;
		let duration = startTime - endTime;

		const event = new DurationEvent(eventName, duration);
		//Append to the writable store
		$timeline = [...$timeline, event]
	}
</script>

<Button outline on:click={handleClick} selected={inProgress}>
	<slot></slot>
</Button>

<style lang="scss">

</style>