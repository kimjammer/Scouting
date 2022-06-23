/**
 * Represents a flag for the scouter to look for their mistake around here
 * @constructor
 * @param {int} time - The match time remaining in seconds when the button was pressed.
 */
export class MistakeEvent {
	constructor (time) {
		this.time = time;
		this.eventName = "Mistake"
	}
}