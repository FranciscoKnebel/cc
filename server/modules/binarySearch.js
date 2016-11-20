'use strict';

module.exports = function binarySearch(items, match) {
	let low = 0;
	let high = items.length - 1;

	while (low <= high) {
		const mid = parseInt((low + high) / 2, 10);

		const current = items[mid];

		if (current > match) {
			high = mid - 1;
		} else if (current < match) {
			low = mid + 1;
		} else {
			return mid;
		}
	}

	return -1;
};
