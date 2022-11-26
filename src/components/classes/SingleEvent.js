/**
 * Represents an event that only happens once per match per robot, usually endgame events.
 * @constructor
 * @param {string} eventName - The name of the event, like "high goal".
 * @param {int} time - The match time remaining in seconds when the button was pressed.
 */
export class SingleEvent {
	constructor (eventName, time) {
		this.eventName = eventName;
		this.time = time;
	}
}