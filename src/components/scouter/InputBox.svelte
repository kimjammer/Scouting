<script>
	import {setContext} from "svelte";
	import Counter from "./Counter.svelte";
	import {timeline} from './timeline.js'


</script>

<!--The different input components -->
<div class="wrapper">
	<Counter label="High Goal"/>
</div>

<style lang="scss">
  @use '../../css/theme.scss';

  .wrapper {
    height: 80vh;
	margin-top: 1em;
    background-color: theme.$secondary-color;
	border-radius: theme.$border-radius;
  }
</style>