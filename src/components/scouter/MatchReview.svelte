<script>
	import EventTimeline from "./EventTimeline.svelte";
	import {Button, Dialog} from "attractions";
	import {createEventDispatcher} from "svelte";

	const dispatch = createEventDispatcher();

	let showDialog = false;

	const handleSubmitBtn = () => {
		showDialog = true;
	};
	const handleBackBtn = () => {
		dispatch('switchPageMode');
	};

	const handleSubmitConfirm = () => {
		showDialog = false;
		dispatch('switchPageMode');
		dispatch('matchSubmit');
	};
	const handleSubmitCancel = () => {
		showDialog = false;
	};
</script>

<div class="wrapper">
	<EventTimeline/>
	<Button filled on:click={handleSubmitBtn}>Submit Match</Button>
	<Button filled on:click={handleBackBtn}>Back</Button>

	<!--This is a floating dialog that confirms the submit.-->
	{#if showDialog}
		<div id="submitConfirmDialog">
		<Dialog title="Confirm Submit" closeCallback={handleSubmitCancel}>
			Are you sure you want to submit and go back to the Scouting Page?
			<Button filled on:click={handleSubmitConfirm}>Yes</Button>
			<Button outline on:click={handleSubmitCancel}>No</Button>
		</Dialog>
	</div>
	{/if}
</div>

<style lang="scss">
  @use '../../css/theme.scss';

  .wrapper {
    height: 80vh;
    margin-top: 1em;
    background-color: theme.$secondary-color;
    border-radius: theme.$border-radius;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0.7em;
  }

  #submitConfirmDialog {
	position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
  }

</style>