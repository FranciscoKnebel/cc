const express = require('express');

module.exports = function paths(app, dirname) {
	app.use('/css/themes/default/assets', express.static(`${dirname}/public/css/themes/default/assets`));
	app.use('/css', express.static(`${dirname}/public/css`));
	app.use('/js', express.static(`${dirname}/public/js`));
	app.use('/img', express.static(`${dirname}/public/img`));
	app.use('/logo', express.static(`${dirname}/public/img/logo`));
};
