const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
const AbstractUserSchema = require('./abstractUsuario');

const clienteSchema = AbstractUserSchema.extend({
	Comprador: {
		currentAuctions: [Leilão],
		finalizedAuctions: [Leilão],
		paymentPendingAuctions: [Leilão],
	},
	Vendedor: {
		currentAuctions: [Leilão],
		finalizedAuctions: [Leilão],
		paymentPendingAuctions: [Leilão],
		validationPendingAuctions: [Leilão],
		cancelledAuctions: [Leilão],
	}
});

module.exports = mongoose.model('Cliente', clienteSchema);
