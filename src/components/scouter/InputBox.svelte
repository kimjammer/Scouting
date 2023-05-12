<script>
	import { Button, Card } from "attractions";
	import { createEventDispatcher } from "svelte";
	import Counter from "./EventComponents/Counter.svelte";
	import ExclusiveDurationButtons from "./EventComponents/ExclusiveDurationButtons.svelte";
    import StateToggle from "./StateComponents/StateToggle.svelte";
	
	let toggleClass = "Cube";
	export let cubeCount = 0; 
	export let coneCount = 0;

	export let cubeHigh = 0; 
	export let cubeMid = 0; 
	export let cubeLow = 0; 
	export let coneHigh = 0; 
	export let coneMid = 0; 
	export let coneLow = 0; 
	const dispatch = createEventDispatcher();
	const handleSwitchToReview = () => {
		dispatch("switchPageMode");
	}
	const checkHigh = () => { 
		if (toggleClass == "Cube") { 
			cubeHigh ++;
		}
		else { 
			coneHigh ++;
		}
	}
	const checkMid = () => { 
		if (toggleClass == "Cube") { 
			cubeMid++;
		}
		else { 
			coneMid ++;
		}
	}
	const checkLow = () => { 
		if (toggleClass == "Cube") { 
			cubeLow ++;
			console.log(cubeLow);
		}
		else { 
			coneLow ++;
		}
	}

	const Switch = () => { 
		if (toggleClass == "Cube") { 
			toggleClass = "Cone";
			
		}
		else  { 
			toggleClass = "Cube";
		}
	}
	const switchCount = () => {
		if (toggleClass == "Cube") { 
			cubeCount ++; 
					}
		else { 
			coneCount ++; 
		}
	}

</script>

<!--The different input components -->
<div class="wrapper">
	<div class = {toggleClass}>
		<Counter on:click ={switchCount} on:click ={checkHigh} name= "high" amount="1" width="30vw" height="2.5vh"><b>High</b></Counter>
		<Counter on:click ={switchCount} on:click ={checkMid} name="middle" amount="1" width="30vw" height="2.5vh"><b>Middle</b></Counter>
		<Counter on:click ={switchCount} on:click ={checkLow} name="low" amount="1" width="30vw" height="2.5vh"><b>Low</b></Counter>
	</div>
		<div class= "Switch">
			<StateToggle on:click={ Switch } labels="{['Cube','Cone']}" names="{['Cube','Cone']}">{toggleClass}</StateToggle>
			</div>
	<div class="chargingstation">
		<ExclusiveDurationButtons labels="{['Nothing','Docked (Not Balanced)','Engaged (Balanced)']}" names="{['nothing','docked','engaged']}" width="10vw" length="10vh"></ExclusiveDurationButtons>
	</div>

	<Button filled on:click={handleSwitchToReview}>Match Review</Button>
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

	//Styling for Barebones
	display:flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
  }
  .Cone { 
	height: 75vh;
	margin-top: 0.5em;
	border-radius: theme.$border-radius;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0.7em;
	text-decoration: underline overline #FC0 3px;
	text-shadow: 1px 1px 2px rgb(255, 255, 255), 0 0 1em rgb(255, 238, 0), 0 0 0.2em rgb(221, 255, 0);
	//Styling for Barebones
	display:flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
  }
  .Cube { 
	height: 75vh;
	margin-top: 0.5em;
	border-radius: theme.$border-radius;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0.7em;
	text-decoration: underline overline rgb(228, 119, 228) 3px;
	text-shadow: 1px 1px 2px rgb(255, 255, 255), 0 0 1em rgb(217, 0, 255), 0 0 0.2em rgb(255, 0, 255);


	//Styling for Barebones
	display:flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
  }

  .community {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.2em;
	padding-bottom: 0.2em;
	font-family: "Courier New", Courier, monospace;
font-size: 17px;
letter-spacing: 5.4px;
word-spacing: -0.6px;
color: #000000;
font-weight: 700;
text-decoration: none solid rgb(68, 68, 68);
font-style: normal;
font-variant: normal;
text-transform: capitalize;
color: #FFF;
text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18

//color: #FFFFFF;

//text-shadow: #FFF 0px 0px 5px, #FFF 0px 0px 10px, #FFF 0px 0px 15px, #FF2D95 0px 0px 20px, #FF2D95 0px 0px 30px, #FF2D95 0px 0px 40px, #FF2D95 0px 0px 50px, #FF2D95 0px 0px 75px;


  }

  .chargingstation {
	background-color: theme.$secondary-color;
	border-radius: theme.$border-radius;
	padding-bottom : 0.5em;
	font-family: "Courier New", Courier, monospace;
	color: #FFF;
text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18

  }
</style>