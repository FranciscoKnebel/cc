const busca = require('./busca');
const alteracao = require('./alteracao');

module.exports = function leilao(app, modules) {
	busca(app, modules);
	alteracao(app, modules);
};
