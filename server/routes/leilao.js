module.exports = function routes(app, modules) {
	app.get('/leilao/criar', (req, res) => {
		res.render('criarLeilao.ejs', { user: req.user });
	});

	app.post('/leilao/criar', (req, res) => {
		const leilao = new modules.Leilao();

		leilao.newAuction(req.body, req.user._id, (auction) => {
			modules.Leilao.findById(auction._id).populate('book').exec((err, doc) => {
				if (err) {
					throw err;
				}

				res.render('novoLeilao.ejs', { user: req.user, leilao: doc });
			});
		});
	});

	app.get('/leilao/listar', (req, res) => {
		res.render('listarLeilao.ejs', { user: req.user, message: '' });
	});

	app.get('/leilao/buscar', (req, res) => {
		res.render('buscarLeilao.ejs', { user: req.user, message: '' });
	});

	app.get('/leilao/:id', (req, res) => {
		res.render('leilao.ejs', { user: req.user, message: '' });
	});
};
