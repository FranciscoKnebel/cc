const request = require('request-promise');

module.exports = function routes(app, modules) {
	app.get('/leilao/criar', (req, res) => {
		if (req.user._type === 'Administrador') {
			res.redirect('back');
		} else {
			res.render('criarLeilao.ejs', { user: req.user });
		}
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

	app.get('/leilao/usuario/pagamento/:id', (req, res) => {
		const options = {
			uri: `${process.env.ROOT_URL}/api/leilao/buscar`,
			json: true,
			qs: {
				id: req.params.id,
			},
		};

		request(options).then((leilao) => {
			const requestFromWinner = leilao.bids[leilao.winningBid].bidder === req.user.id || req.user._type === 'Administrador';
			const onPendingPaymentState = leilao.state === 'paymentPendingAuctions';
			if (onPendingPaymentState && requestFromWinner) {
				res.render('pagamento', { user: req.user, message: '', leilao });
			} else {
				res.redirect('/404');
			}
		}).catch((err) => {
			res.render('pagamento', { user: req.user, message: err.response.body, leilao: false });
		});
	});

	app.get('/leilao/usuario/pagamento/simular/:id', (req, res) => {
		const options = {
			method: 'POST',
			uri: `${process.env.ROOT_URL}/api/leilao/pagamento`,
			json: true, // Automatically parses the JSON string in the response
			qs: {
				id: req.params.id,
			},
		};

		request(options).then((doc) => {
			res.render('simuladordepagamento');
		}).catch((err) => {
			res.json(err);
		});
	});

	app.get('/leilao/usuario/:usertype/:type', (req, res) => {
		if (req.user._type !== 'Cliente') {
			res.redirect('back');
			return;
		}

		const userType = req.params.usertype;
		const auctionType = req.params.type;

		const userTypeIsValid = modules.validType(userType, 'undef');
		const auctionTypeIsValid = modules.validType('undef', auctionType);

		if (userTypeIsValid && auctionTypeIsValid) {
			const options = {
				uri: `${process.env.ROOT_URL}/api/leilao/buscar`,
				json: true, // Automatically parses the JSON string in the response
				body: {
					auctions: req.user[userType][auctionType],
				},
				qs: {
					listAll: true,
				},
			};

			request(options).then((docs) => {
				if (userType === 'Comprador' && auctionType === 'paymentPendingAuctions') {
					res.render('relatorios', { user: req.user, message: false, leiloes: docs, userType, auctionType, payment: true });
				} else {
					res.render('relatorios', { user: req.user, message: false, leiloes: docs, userType, auctionType, payment: false });
				}
			}).catch((err) => {
				console.error(err);
			});
		} else {
			res.send(req.params);
		}
	});

	app.get('/leilao/:id', (req, res) => {
		res.render('leilao.ejs', { user: req.user, message: '' });
	});
};
