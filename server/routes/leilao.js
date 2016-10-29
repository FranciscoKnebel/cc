module.exports = function routes(app, modules) {
	app.get('/leilao/criar', (req, res) => {
		res.render('criarLeilao.ejs', { user: req.user });
	});

	app.get('/leilao/listar', (req, res) => {
		res.render('listarLeilao.ejs', { user: req.user });
	});
};
