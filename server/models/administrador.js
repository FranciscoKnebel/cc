const AbstractUserSchema = require('./abstractUsuario');
const Usuario = require('./usuario');

const administradorSchema = new AbstractUserSchema({
	employeeCode: String,
});

module.exports = Usuario.discriminator('Administrador', administradorSchema);
