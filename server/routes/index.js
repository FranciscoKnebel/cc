const modules = require('../modules/index');

const paths = require('./static');
const authLocal = require('./auth/local');
const email = require('./email');
const api = require('./api/index');

module.exports = function routes(app, dirname, passport) {
	paths(app, dirname);
	authLocal(app, passport, modules);
	email(app);
	api(app, modules);

	app.get('/', (req, res) => {
		res.render('index.ejs');
	});

	app.get('/contato', (req, res) => {
		res.render('contato.ejs', { message: false });
	});

	app.get('*', (req, res) => {
		res.status(404).render('404.ejs');
	});
};
