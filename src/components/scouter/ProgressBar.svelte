<script>
    import {time} from '../time.js';

    $: timePercent = $time / 150 * 100;

    $: currentMode = "None";

    $: {
        //Using the time variable, this sets the current mode to different modes depending on the time 
        if ($time === 0) {
            currentMode = "None";
        }else if ($time >= 135) {
            currentMode = "Auton";
        }else if ($time >= 30) {
            currentMode = "Teleop";
        }else if ($time > 0) {
            currentMode = "Endgame";
        }
    }
</script>
<!--uses the current mode to set the class of the progress bar to change the color of the bar in different modes-->
<div class="wrapper">
    <div class="background">
        <div class = "foreground" style="--timeWidth: {timePercent}%;" 
            class:none="{currentMode == 'None'}"
            class:auton="{currentMode == 'Auton'}"
            class:teleop="{currentMode == 'Teleop'}"
            class:endgame="{currentMode == 'Endgame'}">
        </div>
    </div>
</div>

<style lang="scss">
    @use '../../css/theme.scss';

    .wrapper {
        width: 100%;
        height: 5.4vh;
        margin-top: 0.5em;
    }

    .background {
        width: 100%;
        height: 100%;
        background-color: rgb(255, 255, 255);
        border-radius: 0.5em;
    }

    .foreground {
        height: 100%;
        width: var(--timeWidth);
        background-color: grey;
        border-radius: 0.5em;
        transition: all 1s linear;
    }

    .none {
        background: repeating-linear-gradient(
            -55deg,
            rgb(100,100,100),
            rgb(100,100,100) 10px,
            rgb(75,75,75) 10px,
            rgb(75, 75, 75) 20px);
    }
    // Css code for the color of the progress bar during Auton mode
    .auton {
        background: repeating-linear-gradient(
            -55deg,
            #7ee439,
            #30cf10 10px,
            #00a220 10px,
            #014510 20px);
    }
    // CSS code for the color of the progress bar during teleop mode
    .teleop {
        background: repeating-linear-gradient(
            -55deg,
            #00f2ff,
            #04bad2 10px,
            #017893 10px,
            #013e4a 20px);
    }
    //CSS code for the color of the progress bar during endgame
    .endgame {
        background: repeating-linear-gradient(
            -55deg,
            #fd0000,
            #c40000 10px,
            #750000 10px,
            #290000 20px);
    }
</style>