<script>
	import { Headline} from "attractions";

	let teams = [];

	//Dummy Data
	teams = ["4821","1984","1747","2001","1984","1747","2001","1984","1747","2001","1984","1747","2001","1984","1747","2001","1984","1747","2001","1984","1747","2001","1984","1747","2001","1984","1747","2001","1984","1747","2001"];
</script>

<div class="wrapper">
	<Headline>Teams:</Headline>

	{#each teams as team}
		<div class="teamNumber">
			{team}
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

  .teamNumber {
	margin: 0.3em;
	font-size: larger;
  }

</style>