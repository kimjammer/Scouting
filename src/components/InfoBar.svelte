<script>
	import Timer from './scouter/Timer.svelte';
	import {Button} from 'attractions';
	import logo from '../assets/Panda.png'

	let teamNumber = 9999;
	let scouterID = "A0";
</script>

<div class="wrapper">
	<!--Left Section-->
	<div class="left">
		<img src={logo} alt="Panda Logo" id="panda"/>
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
		<div id="connectionStatus">
			📡
		</div>
		<Button filled>
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
	background-color: #bbcede;
  }
  #connectionStatus {
    font-size: xx-large;
	border-radius: theme.$border-radius;
	background-color: green;
  }
  #panda {
    height: 12vh;
  }
</style>