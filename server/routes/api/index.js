module.exports = function api(app, modules) {
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

	app.get('/api/buscar/leilao', (req, res) => {
		if (req.query.listAll === 'true') {
			if (req.query.state) {
				modules.Leilao.find({ state: req.query.state }).populate('book').exec((err, docs) => {
					if (err) {
						res.status(err.status).send(err);
					}

					res.send(docs);
				});
			} else {
				modules.Leilao.find().populate('book').exec((err, docs) => {
					if (err) {
						res.status(err.status).send(err);
					}

					res.send(docs);
				});
			}
		} else if (!req.query.type) {
			res.status(400).send('listAll is false or undefined, so type needs to be defined.');
		} else {
			const searchType = req.query.type;

			if (searchType !== 't' && searchType !== 'e' && searchType !== 'te' && searchType !== 'et') {
				res.status(406).send(`Invalid type ${searchType} informed. Needs to be 't' (title), 'e' (edition), 'te' or 'et' (title and edition)`);
			}

			if (searchType === 't') {
				modules.Livro.find({ title: req.query.title }).populate('auction').exec((err, docs) => {
					if (err) {
						res.status(err.status).send(err);
					}

					res.send(docs);
				});
			} else if (searchType === 'e') {
				modules.Livro.find({ edition: req.query.edition }).populate('auction').exec((err, docs) => {
					if (err) {
						res.status(err.status).send(err);
					}

					res.send(docs);
				});
			} else if (searchType === 'te' || searchType === 'et') {
				modules.Livro.find({ title: req.query.title, edition: req.query.edition }).populate('auction').exec((err, docs) => {
					if (err) {
						res.status(err.status).send(err);
					}

					res.send(docs);
				});
			} else {
				res.status(406).send(`Invalid type ${searchType} informed. Needs to be 't' (title), 'e' (edition), 'te' or 'et' (title and edition)`);
			}
		}
	});
};
