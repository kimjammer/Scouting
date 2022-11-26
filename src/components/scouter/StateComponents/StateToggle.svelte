<!--
@component StateToggle
Needs a label.
The label must be descriptive and short, as it will be used (with little modification) as the gameState it toggles.
This should not be data that needs to be remembered, as it will not be included in the timeline.
-->
<script>
	import {Button} from "attractions";
	import {gameState} from '../gameState.js'

	export let name = "Unknown";

	//The internal event name is the label lowercase and all spaces replaced with underscores.
	//"High Goal" becomes "high_goal"
	const gameStateName = name.replaceAll(' ','_').toLowerCase();

	const handleClick = () => {
		//If game state isn't defined yet, create it.
		if (! $gameState.hasOwnProperty(`${gameStateName}`)) {
			$gameState[`${gameStateName}`] = false;
		}

		//Toggle the state
		if ($gameState[`${gameStateName}`]){
			$gameState[`${gameStateName}`] = false;
		}else{
			$gameState[`${gameStateName}`] = true;
		}

		console.log($gameState)
	};
</script>

<Button filled on:click={handleClick} on:click danger={$gameState[`${gameStateName}`]}>
	<slot></slot>
</Button>

<style lang="scss">

</style>