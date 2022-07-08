<!--
@component StateToggle
Needs a label.
The label must be descriptive and short, as it will be used (with little modification) as the gateState it toggles.
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

<Button filled on:click={handleClick} danger={$gameState[`${gameStateName}`]}>
	<slot></slot>
</Button>

<style lang="scss">

</style>