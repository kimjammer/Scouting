<script>
	import Counter from "./Counter.svelte";
	import {timeline} from './timeline.js'
	import DurationButton from "./DurationButton.svelte";
	import {Button} from "attractions";
	import ExclusiveDurationButtons from "./ExclusiveDurationButtons.svelte";


</script>

<!--The different input components -->
<div class="wrapper">
	<Counter name="High Goal" amount="1">High Goal</Counter>
	<DurationButton name="Hanging">Hanging</DurationButton>
	<ExclusiveDurationButtons labels="{['Neutral','Defending','Being Defended']}" names="{['Neutral','Defending','Being Defended']}">Defense</ExclusiveDurationButtons>

	<Button filled on:click={console.log($timeline)}>Log Event Timeline</Button>
</div>

<style lang="scss">
  @use '../../css/theme.scss';

  .wrapper {
    height: 80vh;
	margin-top: 1em;
    background-color: theme.$secondary-color;
	border-radius: theme.$border-radius;
  }
</style>