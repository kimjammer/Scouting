<!--
@component DurationButton
Needs a name.
The name must be descriptive and short, as it will be used (with little modification) as db key.
-->
<svelte:options accessors={true}/>
<script>
	import {Button} from "attractions";
	import {DurationEvent} from "../../classes/DurationEvent.js";
	import BigButton from "../custom/BigButton.svelte";
	import {timeline} from '../timeline.js';
	import {time} from '../../time.js';
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
	export let isDisabled = false;
	let inProgress = false;
	let startTime = 0;
	let endTime = 0;

	//If dimensions are supplied, it will use the BigButton Component
	export let width = null;
	export let height = null;

	//If the parent component (ExclusiveDurationButtons) calls this function, the button will end its current event
	//if there is one running, as long as it wasn't this button that just started.
	export const endDuration = () => {
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

			//Send event telling the parent (ExclusiveDurationButtons) (if one exists) that this button was clicked,
			//so it can tell the other buttons to turn off.
			//TODO: This might break if there are more than one exclusive button sets.
			isExclusivityDispatcher = true;
			dispatch('durationBtnPressed');
		}else{
			//If there was an event in progress, it has just ended, process it.
			processDurationEnd();
		}
	};

	const processDurationEnd = () => {
		inProgress = false;
		endTime = $time;
		let duration = startTime - endTime;

		const event = new DurationEvent(eventName, duration, endTime);
		//Append to the writable store
		$timeline = [...$timeline, event]
	}

	//If the time reaches zero, end any currently running events
	$: if ($time === 0 && inProgress) {
		processDurationEnd();
	}
</script>

{#if width != null}
	<BigButton on:click={handleClick} on:click filled={inProgress} disabled={isDisabled || $time === 0} width="{width}" height="{height}" outline>
		<slot></slot>
	</BigButton>
{:else}
	<Button filled on:click={handleClick} on:click selected={inProgress} disabled={isDisabled || $time === 0}>
		<slot></slot>
	</Button>
{/if}


<style lang="scss">

</style>