<!--
@component MechanicalErrors
This is a premade component that can be used across seasons.
This is the Light Solid / Light Flashing / Light Off / Damage button group.
-->
<script>
	import ExclusiveDurationButtons from "../EventComponents/ExclusiveDurationButtons.svelte";
	import DurationButton from "../EventComponents/DurationButton.svelte";
	import {H1} from "attractions";
</script>

<!--The components making up this part.-->
<div class="wrapper">
	<H1>Mechanical Errors</H1>
	<div class="inputs">
		<ExclusiveDurationButtons labels="{['Light Solid','Light Flashing','Light Off']}" names="{['Light Solid','Light Flashing','Light Off']}"></ExclusiveDurationButtons>
		<DurationButton name="Damage">Damage</DurationButton>
	</div>
</div>

<style lang="scss">
  @use '../../../css/theme.scss';

  .wrapper {
	width:max-content;
    background-color: theme.$light-contrast;
    border-radius: theme.$border-radius;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 1em;
  }
  .inputs {
    display: inline-flex;
    flex-direction: row;
    align-content: center;
  }
</style>