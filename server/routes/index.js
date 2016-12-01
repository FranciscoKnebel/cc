const request = require('request-promise');

const modules = require('../modules/index');

const paths = require('./static');
const authLocal = require('./conta/local');
const email = require('./email');
const api = require('./api/index');

const admin = require('./admin');
const leilao = require('./leilao');

module.exports = function routes(app, dirname, passport) {
	paths(app, dirname);
	authLocal(app, passport, modules);
	email(app);

	app.get('/', (req, res) => {
		res.render('index.ejs', { user: req.user });
	});

	app.get('/contato', (req, res) => {
		res.render('contato.ejs', { user: req.user, message: false });
	});

	api(app, modules);

	app.get('/app', modules.isLoggedIn, (req, res) => {
		if (req.user._type === 'Administrador') {
			res.redirect('/admin');
		} else {
			const obj = {
				Comprador: req.user.Comprador,
				Vendedor: req.user.Vendedor,
			};

			const options = {
				uri: `${process.env.ROOT_URL}/api/leilao/buscar`,
				json: true, // Automatically parses the JSON string in the response
				body: {
					userAuctions: obj,
				},
				qs: {
					listAll: true,
				},
			};

			request(options).then((docs) => {
				res.render('app.ejs', { user: req.user, message: req.flash('appMessage'), leiloes: docs });
			}).catch((err) => {
				console.error(err);
			});
		}
	});

	app.get('/relatorios', modules.isLoggedIn, (req, res) => {
		if (req.user._type === 'Administrador') {
			res.redirect('/admin/relatorios');
		} else {
			const obj = {
				Comprador: req.user.Comprador,
				Vendedor: req.user.Vendedor,
			};

			const options = {
				uri: `${process.env.ROOT_URL}/api/leilao/buscar`,
				json: true, // Automatically parses the JSON string in the response
				body: {
					userAuctions: obj,
				},
				qs: {
					listAll: true,
				},
			};

			request(options).then((docs) => {
				res.render('centralrelatorios.ejs', { user: req.user, message: req.flash('appMessage'), leiloes: docs });
			}).catch((err) => {
				console.error(err);
			});
		}
	});

	admin(app, modules);
	leilao(app, modules);

	app.get('*', (req, res) => {
		res.status(404).render('404.ejs', { user: req.user });
	});
};
