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

	app.get('/leilao/editar/:id', modules.isAdmin, (req, res) => {
		modules.Leilao.findById(req.params.id).populate('book').exec((err, doc) => {
			if (err) {
				throw err;
			}
			res.render('editarLeilao.ejs', { user: req.user, message: '', leilao: doc });
		});
	});

	app.post('/leilao/editar', modules.isAdmin, (req, res) => {
		const imgs = [];
		imgs[0] = req.body.imagem;

		modules.Livro.findOneAndUpdate({ _id: req.body.bookid }, {
			author: req.body.autor,
			title: req.body.titulo,
			publisher: req.body.editora,
			edition: req.body.edicao,
			images: imgs,
		}, (err) => {
			if (err) {
				throw err;
			}

			modules.Leilao.findOneAndUpdate({ _id: req.body.id }, {
				initialPrice: req.body.preco,
				currentPrice: req.body.preco,
				description: req.body.descricao,
			}).exec((err2) => {
				if (err2) {
					throw err;
				}

				modules.Leilao.findById(req.body.id).populate('book').exec((err3, doc) => {
					if (err3) {
						throw err3;
					}

					res.render('novoLeilao.ejs', { user: req.user, leilao: doc });
				});
			});
		});
	});

	app.get('/leilao/:id', (req, res) => {
		res.render('leilao.ejs', { user: req.user, message: '' });
	});
};
