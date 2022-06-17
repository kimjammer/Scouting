<script>
	import Timer from './scouter/Timer.svelte';
	import logo from '../assets/Panda.png'

	export let scouterAssignments = {
		R1: null,
		R2: null,
		R3: null,
		B1: null,
		B2: null,
		B3: null,
	};

	//Converts the object into a list of just the values. Those hold the scouter's socket.id or null if there is no scouter
	//assigned to that team.
	$: scouterStatus = Object.values(scouterAssignments);
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
		{#each scouterStatus as scouter, index}
			<!--Give it connected if the status is a truthy value(socket.id) or disconnected if it is falsy.-->
			<div class="connectionStatus" class:connected={scouterStatus[index]} class:disconnected={!scouterStatus[index]}>
				📡
			</div>
		{/each}
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