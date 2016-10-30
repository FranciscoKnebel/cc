module.exports = function routes(app, modules) {
	app.get('/admin', modules.isAdmin, (req, res) => {
		res.render('admin', { user: req.user, message: req.flash('appMessage') });
	});

	app.get('/admin/*', modules.isAdmin, (req, res) => {
		res.render('admin', { user: req.user, message: req.flash('appMessage') });
	});

	app.post('/signup/admin', modules.isAdmin, (req, res) => {
		modules.Usuario.findOne({ email: req.body.email }, (err, doc) => {
			if (err) {
				throw err;
			}

			if (doc) {
				req.flash('appMessage', 'E-mail já cadastrado.');
				res.redirect('/admin');
			} else {
				const user = new modules.Administrador();

				user.name = req.body.nome;
				user.address = req.body.endereco;
				user.CPF = req.body.CPF;
				user.phone = req.body.telefone;
				user.employeeCode = req.body.empregado;
				user.email = req.body.email;
				user.password = user.generateHash(req.body.password);

				user.save((err2) => {
					if (err2) {
						throw err;
					}

					req.flash('appMessage', 'Administrador ' + user.name + ' cadastrado.');
					res.redirect('/admin');
				});
			}
		});
	});
};
