const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
const AbstractUserSchema = require('./abstractUsuario');

const clienteSchema = AbstractUserSchema.extend({
	exemplo: String,
});

module.exports = mongoose.model('Cliente', clienteSchema);
