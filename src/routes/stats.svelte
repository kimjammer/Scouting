<script>
	import TeamList from "../components/TeamList.svelte";
	import AdminInfoBar from "../components/AdminInfoBar.svelte";
	import MatchChooser from "../components/MatchChooser.svelte";
	import StatisticsDisplay from "../components/StatisticsDisplay.svelte";
</script>

<main>
	<AdminInfoBar/>
	<div class="content">
		<TeamList/>
		<MatchChooser/>
		<StatisticsDisplay/>
	</div>
</main>

<style lang="scss">
  :root {
    font-family: -apple-system, BlinkMacSystemFont, Tahoma ,'Segoe UI', Roboto, Oxygen,
    Ubuntu,'Helvetica Neue', sans-serif;
  }

  body {
	margin: 0 0 0 0;
  }

  main {
    height: 95vh;
  }

  .content{
	display: flex;
	gap: 0.5em;
  }
</style>