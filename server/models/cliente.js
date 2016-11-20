'use strict';

const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
const AbstractUserSchema = require('./abstractUsuario');

const binarySearch = require('../modules/binarySearch');

const clienteSchema = AbstractUserSchema.extend({
	Comprador: {
		currentAuctions: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Leilao',
		}],
		finalizedAuctions: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Leilao',
		}],
		paymentPendingAuctions: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Leilao',
		}],
	},
	Vendedor: {
		currentAuctions: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Leilao',
		}],
		finalizedAuctions: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Leilao',
		}],
		paymentPendingAuctions: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Leilao',
		}],
		validationPendingAuctions: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Leilao',
		}],
		cancelledAuctions: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Leilao',
		}],
	},
});

function validType(type, subtype) {
	let valid = true;

	switch (type) {
	case 'Comprador':
	case 'Vendedor':
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
		break;
	default:
		valid = false;
	}

	return valid;
}

clienteSchema.methods.addAuction = function addAuction(auction, type, subtype) {
	const valid = validType(type, subtype);
	if (!valid) { // passed invalid type or subtype
		return false;
	}

	const index = binarySearch(this[type][subtype], auction);
	if (index < 0) {
		this[type][subtype].push(auction);
		return true;
	}
	return false;
};

clienteSchema.methods.removeAuction = function removeAuction(auction, type, subtype) {
	const valid = validType(type, subtype);

	if (!valid) { // passed invalid type or subtype
		return false;
	}

	const index = binarySearch(this[type][subtype], auction);
	if (index >= 0) {
		this[type][subtype].splice(index, 1);
		return true;
	}
	return false;
};

clienteSchema.methods.updateState = function updateAuction(auction, type, oldtype, newtype) {
	this.removeAuction(auction, type, oldtype);
	return this.addAuction(auction, type, newtype);
};

module.exports = mongoose.model('Cliente', clienteSchema);
