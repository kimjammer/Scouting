<script>
	import {time} from "../time.js";

	//Basically just renames time to matchTime, but it updates reactively
	$: matchTime = $time;
	let modeTime = 0;

	//Update the modeTime everytime the matchTime changes
	$: {
		if (matchTime > 135) {
			//Autonomous Period, first 15 seconds
			modeTime = matchTime - 135;
		}else {
			//Teleoperated Period
			modeTime = matchTime;
		}
	}

	// Some code to convert number of seconds to a text string with a zero padding the seconds if less than 10 so it appears
	// as 1:01 instead of 1:1
	$: matchTimeText = `${Math.floor(matchTime / 60)}:${(matchTime % 60) < 10 ? '0'+(matchTime % 60).toString() : matchTime % 60}`;
	$: modeTimeText = `${Math.floor(modeTime / 60)}:${(modeTime % 60) < 10 ? '0'+(modeTime % 60).toString() : modeTime % 60}`;
</script>

<div class="wrapper">
	Match: {matchTimeText}
	<br>
	Mode : {modeTimeText}
</div>

<style lang="scss">
  @use '../../css/theme.scss';

  .wrapper{
    background-color: #bbcede;
    height: 80%;
	border-radius: theme.$border-radius;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
	padding: 0.2em;

    font-size: xx-large;
  }
</style>