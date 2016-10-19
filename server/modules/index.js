function Library() { }
Library.prototype.Leilao = require('../models/leilao');
Library.prototype.Livro = require('../models/livro');
Library.prototype.isLoggedIn = require('./isLoggedIn');
Library.prototype.isLoggedOut = require('./isLoggedOut');

module.exports = exports = new Library();
