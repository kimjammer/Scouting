<script>
	import {timeline} from './timeline.js'
</script>

<div class="wrapper">
	{#each $timeline as event}
		<div>{event}</div>
	{/each}
</div>

<style lang="scss">
  @use '../../css/theme.scss';


</style>