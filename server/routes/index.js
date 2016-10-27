const modules = require('../modules/index');

const paths = require('./static');
const authLocal = require('./auth/local');
const email = require('./email');
const api = require('./api/index');

const leilao = require('./leilao');

module.exports = function routes(app, dirname, passport) {
	paths(app, dirname);
	authLocal(app, passport, modules);
	email(app);
	api(app, modules);

	app.get('/', (req, res) => {
		res.render('index.ejs', { user: req.user });
	});

	app.get('/app', modules.isLoggedIn, (req, res) => {
		res.render('app.ejs', { user: req.user, message: req.flash('appMessage') });
	});

	app.get('/contato', (req, res) => {
		res.render('contato.ejs', { user: req.user, message: false });
	});

	leilao(app, modules);

	app.get('*', (req, res) => {
		res.status(404).render('404.ejs', { user: req.user });
	});
};
