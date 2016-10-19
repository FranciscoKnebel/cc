module.exports = function authLocal(app, passport, modules) {
	app.get('/logout', modules.isLoggedIn, (req, res) => {
		req.logout();

		res.redirect('/');
	});

	app.get('/login', modules.isLoggedOut, (req, res) => {
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	app.post('/login', modules.isLoggedOut, passport.authenticate('local-login', {
		successRedirect: '/app',
		failureRedirect: '/login',
		failureFlash: true,
	}));

	app.get('/auth', (req, res) => {
		res.redirect('/login');
	});

	app.get('/signup', modules.isLoggedOut, (req, res) => {
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	app.post('/signup', modules.isLoggedOut, passport.authenticate('local-signup', {
		successRedirect: '/app',
		failureRedirect: '/login',
		failureFlash: true,
	}));
};
