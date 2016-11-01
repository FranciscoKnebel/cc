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

	app.all('*', modules.isLoggedIn);
	api(app, modules);

	app.get('/app', (req, res) => {
		res.render('app.ejs', { user: req.user, message: req.flash('appMessage') });
	});

	admin(app, modules);
	leilao(app, modules);

	app.get('*', (req, res) => {
		res.status(404).render('404.ejs', { user: req.user });
	});
};
