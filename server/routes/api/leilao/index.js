const busca = require('./busca');
const alteracao = require('./alteracao');
const lance = require('./lance');

module.exports = function leilao(app, modules) {
	busca(app, modules);

	alteracao(app, modules);
	lance(app, modules);
};
