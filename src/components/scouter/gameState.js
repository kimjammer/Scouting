import {writable} from 'svelte/store';

// Stores various aspects about the current state of the game
//that don't directly affect the game and shouldn't be stored
//in the timeline.
export const gameState = writable({});