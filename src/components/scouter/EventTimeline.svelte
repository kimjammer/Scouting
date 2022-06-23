<script>
	import {H1} from "attractions";
	import {timeline} from "./timeline.js";
	import {get} from "svelte/store";

	$: timelineList = $timeline;

	const timestampToMinSec = (sec) => {
		return `${Math.floor(sec / 60)}:${(sec % 60) < 10 ? '0'+(sec % 60).toString() : sec % 60}`;
	}
	function toTitleCase(str) {
		return str.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
	}
	const formattedName = (eventName) => {
		return toTitleCase(eventName.replaceAll('_',' '));
	}

	const handleEventRemove = (i) => {
		let timelineCopy = get(timeline);
		timelineCopy.splice(i, 1);
		$timeline = timelineCopy;
	}
</script>

<div class="wrapper">
	<H1>Event Timeline</H1>
	<div>
		{#each timelineList as event, i}
			<div class="eventItem" on:click={() => handleEventRemove(i)} class:mistake={event.eventName == "Mistake"}>
				<span>{timestampToMinSec(event.time)}</span> - {formattedName(event.eventName)}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
  @use '../../css/theme.scss';

  .wrapper {
	display: inline-block;
    background-color: theme.$light-contrast;
    border-radius: theme.$border-radius;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0.3em;
  }

  .eventItem {
	margin-top: 0.2em;
	padding: 0.1em;
  }

  .eventItem:hover{
	text-decoration: line-through;
	cursor: pointer;
  }

  .mistake {
	background-color: #ff4646;
	border-radius: 0.25em;
  }
</style>