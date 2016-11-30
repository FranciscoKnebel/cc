'use strict';

const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
const AbstractUserSchema = require('./abstractUsuario');

const binarySearch = require('../modules/binarySearch');
const validType = require('../modules/validType');

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
		paymentDoneAuctions: [{
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
		paymentDoneAuctions: [{
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
	cash: Number,
});

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
	return -1;
};

clienteSchema.methods.updateState = function updateAuction(auction, type, oldtype, newtype) {
	if (oldtype === newtype) {
		console.log('Types are equal, so would remove and insert to same subtype.');
		return -1;
	}

	const remove = this.removeAuction(auction, type, oldtype);

	if (remove === false || remove === -1) {
		console.log('Erro na remoção de leilão do usuário ' + this._id + ': ', remove);
		//return remove;
	}

	return this.addAuction(auction, type, newtype);
};

module.exports = mongoose.model('Cliente', clienteSchema);
