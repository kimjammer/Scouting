<script>
	import Counter from "./EventComponents/Counter.svelte";
	import DurationButton from "./EventComponents/DurationButton.svelte";
	import {Button} from "attractions";
	import ExclusiveDurationButtons from "./EventComponents/ExclusiveDurationButtons.svelte";
	import StateToggle from './StateComponents/StateToggle.svelte';
	import {createEventDispatcher} from "svelte";
	import MechanicalErrors from "./Premade/MechanicalErrors.svelte";
	import Defense from "./Premade/Defense.svelte";
	import SequentialEvents from "./EventComponents/SequentialEvents.svelte";

	const dispatch = createEventDispatcher();
	const handleSwitchToReview = () => {
		dispatch("switchPageMode");
	}
</script>

<!--The different input components -->
<div class="wrapper">
	<Counter name="High Goal" amount="1">High Goal</Counter>
	<DurationButton name="Hanging">Hanging</DurationButton>
	<StateToggle name="Bonus Mode">Bonus Mode</StateToggle>
	<Defense></Defense>
	<MechanicalErrors></MechanicalErrors>
	<SequentialEvents names="{['first','second','third']}"></SequentialEvents>

	<Button filled on:click={handleSwitchToReview}>Match Review</Button>
</div>

<style lang="scss">
  @use '../../css/theme.scss';

  .wrapper {
    height: 80vh;
	margin-top: 1em;
    background-color: theme.$secondary-color;
	border-radius: theme.$border-radius;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0.7em;

	//Styling for Barebones
	display:flex;
	justify-content: flex-start;
	align-items: flex-start;
  }
</style>