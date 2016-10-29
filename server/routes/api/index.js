module.exports = function api(app, modules) {
	app.post('/criar/leilao', modules.isLoggedIn, (req, res) => {
		const leilao = new modules.Leilao();

		leilao.newAuction(req.body, req.user._id, (auction) => {
			modules.Leilao.findOne({ _id: auction._id }).populate('book').exec((err, doc) => {
				if (err) {
					throw err;
				}

				res.render('novoLeilao.ejs', { user: req.user, leilao: doc });
			});
		});
	});
};
it
