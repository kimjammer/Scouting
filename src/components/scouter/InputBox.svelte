<script>
	import { Button, Card } from "attractions";
	import { createEventDispatcher } from "svelte";
	import Counter from "./EventComponents/Counter.svelte";
	import ExclusiveDurationButtons from "./EventComponents/ExclusiveDurationButtons.svelte";

	const dispatch = createEventDispatcher();
	const handleSwitchToReview = () => {
		dispatch("switchPageMode");
	}
</script>

<!--The different input components -->
<div class="wrapper">
	<div class="community">
		<Counter name="high" amount="1" width="30vw" height="5vh">High</Counter>
		<Counter name="middle" amount="1" width="30vw" height="5vh">Middle</Counter>
		<Counter name="low" amount="1" width="30vw" height="5vh">Low</Counter>
	</div>
	<div class="chargingstation">
		<ExclusiveDurationButtons labels="{['Nothing','Docked (Not Balanced)','Engaged (Balanced)']}" names="{['nothing','docked','engaged']}" width="10vw" length="10vh"></ExclusiveDurationButtons>
	</div>

	<Button filled on:click={handleSwitchToReview}>Match Review</Button>
</div>

<style lang="scss">
  @use '../../css/theme.scss';

  .wrapper {
    height: 75vh;
	margin-top: 0.5em;
    background-color: theme.$secondary-color;
	border-radius: theme.$border-radius;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0.7em;

	//Styling for Barebones
	display:flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
  }

  .community {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5em;
  }

  .chargingstation {

  }
</style>