<script>
	import Timer from './scouter/Timer.svelte';
	import {Button} from 'attractions';
	import {timeline} from "./scouter/timeline.js";
	import logo from '../assets/Panda.png';
	import egg1 from '../assets/Happanda.png';
	import {time} from "./time.js";
	import {MistakeEvent} from "./classes/MistakeEvent.js";

	export let teamNumber = 9999;
	export let scouterID = "A0";
	export let connected = false;

	//When the mistake button is pressed, add a mistake to the timeline
	const handleMistake = () => {
		const event = new MistakeEvent($time);
		//Append to the writable store
		$timeline = [...$timeline, event];
	}
</script>

<div class="wrapper">
	<!--Left Section-->
	<div class="left">
		<!-- determines if the team assigned is the funny team and will update the image for a cool easter egg -->
		<img src={teamNumber === 1747 ? egg1 : logo} alt={teamNumber === 1747 ? "A cool panda for a cool team" : "Pixel panda"} id="panda"/>
	</div>

	<!--Middle Section-->
	<div class="middle">
		<div class="infoBox">
			Team: {teamNumber}
		</div>
		<Timer/>
		<div class="infoBox">
			Scouter: {scouterID}
		</div>
	</div>

	<!--Right Section-->
	<div class="right">
		<div class="connectionStatus" class:connected={connected} class:disconnected={!connected}>
			📡
		</div>
		<Button filled on:click={handleMistake}>
			Mistake
		</Button>
	</div>
</div>

<style lang="scss">
  @use '../css/theme.scss';

  .wrapper {
    display:flex;
    justify-content: space-between;
	align-items: center;
    height: 15%;
    background-color: theme.$secondary-color;

	padding: 1em;
	border-radius: theme.$border-radius;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .middle {
    display: flex;
    justify-items: center;
	align-items: center;
	gap: 1em;
  }
  .right {
    display:flex;
  }
  .infoBox {
    display: flex;
    align-items: center;
    text-align: center;
    font-size: x-large;
    height: 100%;
	border-radius: theme.$border-radius;
	padding: 0.3em;
	background-color: #b9d143;
  }
  .connectionStatus {
    font-size: xx-large;
	border-radius: theme.$border-radius;
	background-color: green;
  }
  #panda {
    height: 12vh;
  }

  .connected {
    background-color: green;
  }
  .disconnected {
    background-color: red;
  }
</style>