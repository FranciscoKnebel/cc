module.exports = function routes(app, modules) {
	app.get('/criar/leilao', modules.isLoggedIn, (req, res) => {
		res.render('criarLeilao.ejs', { user: req.user });
	});
};
