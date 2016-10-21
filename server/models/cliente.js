const AbstractUserSchema = require('./abstractUsuario');
const Usuario = require('./usuario');

const clienteSchema = new AbstractUserSchema({
	exemplo: String,
});

module.exports = Usuario.discriminator('Cliente', clienteSchema);
