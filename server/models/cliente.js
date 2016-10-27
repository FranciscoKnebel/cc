const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
const AbstractUserSchema = require('./abstractUsuario');

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

module.exports = mongoose.model('Cliente', clienteSchema);
