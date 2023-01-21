<script>
    import {time} from '../time.js';

    $: timePercent = $time / 150 * 100;

    $: currentMode = "None";
    $: {
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
        height: 5vh;
        margin-top: 0.5em;
    }

    .background {
        width: 100%;
        height: 100%;
        background-color: green;
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
    .auton {
        background: repeating-linear-gradient(
            -55deg,
            #34b233,
            #34b233 10px,
            #006c00 10px,
            #006c00 20px);
    }
    .teleop {
        background: repeating-linear-gradient(
            -55deg,
            #01afff,
            #01afff 10px,
            #0073a2 10px,
            #0073a2 20px);
    }
    .endgame {
        background: repeating-linear-gradient(
            -55deg,
            #ff4545,
            #ff4545 10px,
            #a42626 10px,
            #a42626 20px);
    }
</style>