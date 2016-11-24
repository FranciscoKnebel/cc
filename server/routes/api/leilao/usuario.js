module.exports = function routes(app, modules) {
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
			const user = req.user;
			modules.Leilao.find({
				_id: { $in: req.user[userType][auctionType] },
			}).populate('book').exec(function (err, docs) {
        res.render('relatorios', { user: req.user, message: false, leiloes: docs });
			});
		} else {
			res.send(req.params);
		}
	});
};
