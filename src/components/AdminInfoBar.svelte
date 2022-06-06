<script>
	import Timer from './scouter/Timer.svelte';
	import logo from '../assets/Panda.png'
</script>

<div class="wrapper">
	<!--Left Section-->
	<div class="left">
		<img src={logo} alt="Panda Logo" id="panda"/>
	</div>

	<!--Middle Section-->
	<div class="middle">
		<Timer/>
	</div>

	<!--Right Section-->
	<div class="right">
		<div class="connectionStatus">
			📡
		</div>
		<div class="connectionStatus">
			📡
		</div>
		<div class="connectionStatus">
			📡
		</div>
		<div class="connectionStatus">
			📡
		</div>
		<div class="connectionStatus">
			📡
		</div>
		<div class="connectionStatus">
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
    font-size: x-large;
    border-radius: theme.$border-radius;
    background-color: green;
  }
  #panda {
    height: 12vh;
  }
</style>