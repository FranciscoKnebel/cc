module.exports = function api(app, modules) {
	app.post('/criar/leilao', modules.isLoggedIn, (req, res) => {
		const leilao = new modules.Leilao();

		leilao.newAuction(req.body, req.user._id, function (auction) {
			res.send(auction);
		});
	});
};
