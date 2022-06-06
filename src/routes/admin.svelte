<script>
	import AdminInfoBar from "../components/AdminInfoBar.svelte";
	import MatchQueuer from "../components/MatchQueuer.svelte";
</script>

<main>
	<AdminInfoBar/>
	<div class="contentBox">
		<MatchQueuer/>
	</div>
</main>


<style lang="scss">
  :root {
    font-family: -apple-system, BlinkMacSystemFont, Tahoma ,'Segoe UI', Roboto, Oxygen,
    Ubuntu,'Helvetica Neue', sans-serif;
  }
  main {
    height: 95vh;
  }
  .contentBox {
	display: flex;
	justify-content: center;
  }
</style>