/**
 * Represents an increment or decrement to counting data, like goals scored.
 * @constructor
 * @param {string} eventName - The name of the event, like "high goal".
 * @param {int} time - The match time remaining in seconds when the button was pressed.
 * @param {int} amount - The amount to increment or decrement the data by.
 */
export class CountEvent {
	constructor (eventName, time, amount) {
		this.eventName = eventName;
		this.time = time;
		this.amount = amount;
	}
}