<script>
	import logo from '../assets/Panda.png'
	import {Headline} from "attractions";
	export let connected = false;
</script>

<div class="wrapper">
	<!--Left Section-->
	<div class="left">
		<img src={logo} alt="Panda Logo" id="panda"/>
	</div>

	<!--Middle Section-->
	<div class="middle">
		<Headline>FRC Scouting Statistics</Headline>
	</div>

	<!--Right Section-->
	<div class="right">
		<!--Give it connected if the status is a true value or disconnected if it is false.-->
		<div class="connectionStatus" class:connected={connected} class:disconnected={!connected}>
			📡
		</div>

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
  .connectionStatus {
    font-size: xx-large;
    border-radius: theme.$border-radius;
    background-color: green;
  }
  .connected {
	background-color: green;
  }
  .disconnected {
	background-color: red;
  }

  #panda {
    height: 12vh;
  }
</style>