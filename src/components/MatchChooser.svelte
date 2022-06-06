<script>
	import {H1, H2, Headline} from "attractions";

	let matches;

	//Dummy Data
	matches = [1,3,9,19,24]
</script>

<div class="wrapper">
	<Headline>Choose Match:</Headline>

	<H1>Average</H1>
	{#each matches as match}
		<div class="matchNumber">
			<H2>{match}</H2>
		</div>
	{/each}
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
    overflow-y: scroll;
  }
</style>