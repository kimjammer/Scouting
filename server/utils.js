//Random Utility and helper functions

export function getKeyByValue(object, value) {
	return Object.keys(object).find(key => object[key] === value);
}