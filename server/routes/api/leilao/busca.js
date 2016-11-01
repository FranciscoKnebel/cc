const mongoose = require('mongoose');

module.exports = function leilao(app, modules) {
	app.get('/api/leilao/buscar', (req, res) => {
		if (req.query.listAll === 'true') {
			if (req.query.state) {
				if (req.user._type === 'Administrador') {
					modules.Leilao.find({ state: req.query.state }).populate('book seller').exec((err, docs) => {
						if (err) {
							res.status(err.status).send(err);
						}

						res.send(docs);
					});
				} else {
					modules.Leilao.find({ state: req.query.state }).populate('book').exec((err, docs) => {
						if (err) {
							res.status(err.status).send(err);
						}

						res.send(docs);
					});
				}
			} else {
				modules.Leilao.find().populate('book').exec((err, docs) => {
					if (err) {
						res.status(err.status).send(err);
					}

					res.send(docs);
				});
			}
		} else if (!req.query.type && !req.query.id) {
			res.status(400).send('listAll is false or undefined, so type needs to be defined.');
		} else if (req.query.id) {
			if (mongoose.Types.ObjectId.isValid(req.query.id)) {
				modules.Leilao.findById(req.query.id).populate('book').exec((err, doc) => {
					if (err) {
						res.status(400).send(err.message);
					}
					if (!doc) {
						res.status(404).send(doc);
					} else {
						res.send(doc);
					}
				});
			} else {
				res.status(400).send("Invalid id " + req.query.id + " informed.");
			}
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
}
