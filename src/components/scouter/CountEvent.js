/**
 * Represents an increment or decrement to counting data, like goals scored.
 * @constructor
 * @param {int} time - The match time remaining in seconds when the button was pressed.
 * @param {int} amount - The amount to increment or decrement the data by.
 */
export class CountEvent {
	constructor (time, amount) {
		this.time = time;
		this.amount = amount;
	}
}