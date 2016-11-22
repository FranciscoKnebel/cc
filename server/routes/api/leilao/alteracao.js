const mongoose = require('mongoose');

module.exports = function alteracao(app, modules) {
	app.post('/api/leilao/alterar', modules.isAdmin, (req, res) => {
		if (mongoose.Types.ObjectId.isValid(req.body.id)) {
			modules.Leilao.findById(req.body.id, (err, leilao) => {
				if (err) {
					console.error(err);
				}

				if (!leilao) {
					res.status(404).send(`Leilão ${req.body.id} não encontrado.`);
				} else if (req.body.state) {
					const oldState = leilao.state;

					modules.Cliente.findById(leilao.seller, (err3, cliente) => {
						cliente.updateState(leilao._id, 'Vendedor', oldState, req.body.state);
						cliente.save();
					});

					leilao.state = req.body.state;
					leilao.save(function (err2) {
						if (err2) {
							console.error(err2);
						}

						res.send(leilao);
					});
				} else {
					const imgs = [];
					imgs[0] = req.body.imagem;

					modules.Livro.findOneAndUpdate({ _id: req.body.bookid }, {
						author: req.body.autor,
						title: req.body.titulo,
						publisher: req.body.editora,
						edition: req.body.edicao,
						images: imgs,
					}, (err4) => {
						if (err4) {
							throw err4;
						}

						leilao.initialPrice = req.body.preco;
						leilao.currentPrice = req.body.preco;
						leilao.description = req.body.descricao;
						leilao.save();

						modules.Leilao.findById(req.body.id).populate('book').exec((err3, doc) => {
							if (err3) {
								throw err3;
							}

							res.render('novoLeilao.ejs', { user: req.user, leilao: doc });
						});
					});
				}
			});
		} else {
			res.status(400).send('Invalid id informed.');
		}
	});
};
