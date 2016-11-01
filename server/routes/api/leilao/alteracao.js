const mongoose = require('mongoose');

module.exports = function alteracao(app, modules) {
	app.post('/api/leilao/alterar', modules.isAdmin, (req, res) => {
		if (mongoose.Types.ObjectId.isValid(req.body.id)) {
			modules.Leilao.findById(req.body.id, (err, doc) => {
				if (err) {
					console.error(err);
				}

				if (!doc) {
					res.status(404).send('Leilão ' + req.body.id + ' não encontrado.');
				} else if (req.body.state) {
					doc.state = req.body.state;
					doc.save(function (err2) {
						if (err2) {
							console.error(err2);
						}

						res.send(doc);
					});
				} else {
					console.log("Alterar dados do leilão.");
				}
			});
		} else {
			res.status(400).send('Invalid id informed.');
		}
	});
};
