'use strict';

const mongoose = require('mongoose');
const request = require('request-promise');

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

					//need to updateState on Comprador bids

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

	app.post('/api/leilao/pagamento', (req, res) => {
		// security problem: does not require authentication to perform payment
		// this is a test only method.
		const options = {
			uri: `${process.env.ROOT_URL}/api/leilao/buscar`,
			json: true,
			qs: {
				id: req.query.id,
			},
		};

		request(options).then((auction) => {
			const onPendingPaymentState = auction.state === 'paymentPendingAuctions';
			const limitDateNotReached = new Date(auction.limitDate) > new Date();

			if (onPendingPaymentState && limitDateNotReached) {
				modules.Leilao.findById(auction._id, (err, doc) => {
					doc.state = 'paymentDoneAuctions';
					doc.save();
				});

				modules.Cliente.findById(auction.seller, (err, vendedor) => {
					vendedor.updateState(auction._id, 'Vendedor', 'paymentPendingAuctions', 'paymentDoneAuctions');
					vendedor.cash += auction.currentPrice; // 10% fica com a Cooper Comics na retirada
					// enviar e-mail para o vencedor avisando que o pagamento foi confirmado

					vendedor.save(() => {
						// atualizar leilão no usuário vencedor
						const topbid = auction.bids[auction.winningBid];
						modules.Cliente.findById(topbid.bidder, (err2, comprador) => {
							comprador.updateState(auction._id, 'Comprador', 'paymentPendingAuctions', 'paymentDoneAuctions');
							// enviar e-mail para o comprador avisando que seu pagamento foi confirmado
							comprador.save(() => {
								// atualizar leilão nos usuários que perderam
								if (auction.bids.length > 1) {
									for (let i = 0; i < auction.bids.length; i += 1) {
										if (i !== auction.winningBid) {
											modules.Cliente.findById(auction.bids[i].bidder,
												(err3, compradorPerdedor) => {
													compradorPerdedor.removeAuction(auction._id, 'Comprador', 'currentAuctions');
													compradorPerdedor.save();
												});
										}
									}
								}
								res.send(req.query);
							});
						});
					});
				});
			} else {
				res.send('wrong stuff.');
			}
		}).catch((err) => {
			console.error(err);
			res.render('pagamento', { user: req.user, message: err.response.body, leilao: false });
		});
	});

	app.post('/api/leilao/retirada', (req, res) => {
		const options = {
			uri: `${process.env.ROOT_URL}/api/leilao/buscar`,
			json: true,
			qs: {
				id: req.query.id || req.body.id,
			},
		};

		request(options).then((auction) => {
			const onPaymentDoneState = auction.state === 'paymentDoneAuctions';
			const newState = 'finalizedAuctions';

			if (onPaymentDoneState) {
				modules.Cliente.findById(auction.seller, (err, cliente) => {
					cliente.updateState(auction._id, 'Vendedor', 'paymentDoneAuctions', newState);
					cliente.save();
				});

				modules.Cliente.findById(auction.bids[auction.winningBid].bidder, (err, cliente) => {
					cliente.updateState(auction._id, 'Comprador', 'paymentDoneAuctions', newState);
					cliente.save();
				});

				modules.Leilao.findById(auction._id, (err, leilao) => {
					leilao.finishedDate = new Date();
					leilao.state = newState;
					leilao.save();
					res.send(leilao);
				});
			}
		}).catch((err) => {
			console.error(err);
			res.redirect('back');
		});
	});
};
