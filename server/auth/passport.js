const local = require('./local');

const User = require('../models/user');

module.exports = function auth(passport) {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});

	local(passport);
};
