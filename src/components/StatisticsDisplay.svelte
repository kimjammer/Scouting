<script>
	import {Headline} from "attractions";
</script>

<div class="wrapper">
	<Headline>Statistics</Headline>
</div>

<style lang="scss">
  @use '../css/theme.scss';

  .wrapper {
    margin-top: 1em;
    background-color: theme.$secondary-color;
    border-radius: theme.$border-radius;

    padding: 1em;
    border-radius: theme.$border-radius;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

    height: 80vh;
  }
</style>