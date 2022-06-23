/**
 * Represents a duration event
 * @constructor
 * @param {string} eventName - The name of the event, like "high goal".
 * @param {int} duration - The duration in seconds of the event.
 * @param {int} time - The time the event ended.
 */
export class DurationEvent {
	constructor (eventName, duration, time) {
		this.eventName = eventName;
		this.duration = duration;
		this.time = time;
	}
}