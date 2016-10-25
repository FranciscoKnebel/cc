const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
const AbstractUserSchema = require('./abstractUsuario');

const administradorSchema = AbstractUserSchema.extend({
	employeeCode: String
});

module.exports = mongoose.model('Administrador', administradorSchema);
