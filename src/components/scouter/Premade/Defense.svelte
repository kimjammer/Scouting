<script>
	import ExclusiveDurationButtons from "../EventComponents/ExclusiveDurationButtons.svelte";
	import {H1} from "attractions";
</script>


<div class="wrapper">
	<H1>Defense</H1>
	<ExclusiveDurationButtons labels="{['Neutral','Defending','Being Defended']}" names="{['Neutral','Defending','Being Defended']}"></ExclusiveDurationButtons>
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
</style>