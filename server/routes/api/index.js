const leilao = require('./leilao/index');

module.exports = function api(app, modules) {
	leilao(app, modules);
};
