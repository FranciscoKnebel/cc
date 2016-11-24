const busca = require('./busca');
const alteracao = require('./alteracao');
const lance = require('./lance');
const usuario = require('./usuario');

module.exports = function leilao(app, modules) {
	busca(app, modules);
	alteracao(app, modules);
	lance(app, modules);
	usuario(app, modules);
};
