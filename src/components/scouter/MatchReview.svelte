<script>
	import EventTimeline from "./EventTimeline.svelte";
	import {Button, Dialog, H1, Subhead, TextField} from "attractions";
	import {createEventDispatcher} from "svelte";

	const dispatch = createEventDispatcher();

	let showDialog = false;
	let showError = false;
	export let commentBox;
	export let connected;

	const handleSubmitBtn = () => {
		//Don't allow submission if we're not connected to server.
		if (!connected) {
			showError = true;
			return;
		}

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

	const handleErrorClose = () => {
		showError = false;
	};
</script>

<div class="wrapper">
	<div class="left">
		<EventTimeline/>
		<Button filled on:click={handleSubmitBtn}>Submit Match</Button>
		<Button filled on:click={handleBackBtn}>Back</Button>
	</div>
	<div class="right">
		<H1>Comment Box:</H1>
		<Subhead>
			Write any intesting information like mechanical failures, or their preference 
			for game objects, !!!IMPORTANT!!! <b> make sure to include where the robot picks up game objects from i.e floor, chute, or shelf.</b>
		</Subhead>
		<TextField multiline bind:value={commentBox}></TextField>
	</div>

	<!--This is a floating dialog that confirms the submit.-->
	{#if showDialog}
		<div id="submitConfirmDialog">
		<Dialog title="Confirm Submit" closeCallback={handleSubmitCancel}>
			Are you sure you want to submit and go back to the Scouting Page?
			<div class="dialogButtons">
				<Button filled on:click={handleSubmitConfirm}>Yes</Button>
				<Button outline on:click={handleSubmitCancel}>No</Button>
			</div>
		</Dialog>
	</div>
	{/if}

	<!--This is a floating error box if we're not connected to server.-->
	{#if showError}
		<div id="errorBox">
		<Dialog title="Error: Not Connected" closeCallback={handleErrorClose}>
			You are not connected to the server.
		</Dialog>
	</div>
	{/if}
</div>

<style lang="scss">
  @use '../../css/theme.scss';

  .wrapper {
    height: 75vh;
    margin-top: 0.5em;
    background-color: theme.$secondary-color;
    border-radius: theme.$border-radius;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0.7em;
	display:flex;
	gap: 2em;
	
  }

  #submitConfirmDialog {
	position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .dialogButtons {
	display: flex;
	gap: 1em;
	margin-top: 1em;
  }

  #errorBox {
	position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .right {
	
  }
</style>