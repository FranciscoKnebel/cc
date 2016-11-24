'use strict';

module.exports = function validType(type, subtype) {
	let valid = true;

	switch (type) {
	case 'Comprador':
	case 'Vendedor':
	case 'undef':
		break;
	default:
		valid = false;
	}

	switch (subtype) {
	case 'currentAuctions':
	case 'finalizedAuctions':
	case 'paymentPendingAuctions':
	case 'validationPendingAuctions':
	case 'cancelledAuctions':
	case 'undef':
		break;
	default:
		valid = false;
	}

	return valid;
};
