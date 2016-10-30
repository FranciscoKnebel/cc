module.exports = function isAdmin(req, res, next) {
	if (req.user._type === 'Administrador') {
		return next();
	}
	res.redirect('back');
};
