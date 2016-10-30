function Library() { }
Library.prototype.Usuario = require('../models/usuario');
Library.prototype.Cliente = require('../models/cliente');
Library.prototype.Administrador = require('../models/administrador');
Library.prototype.Leilao = require('../models/leilao');
Library.prototype.Livro = require('../models/livro');
Library.prototype.isAdmin = require('./isAdmin');
Library.prototype.isLoggedIn = require('./isLoggedIn');
Library.prototype.isLoggedOut = require('./isLoggedOut');

module.exports = exports = new Library();
