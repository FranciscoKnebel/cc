module.exports = function isAdmin(req, res, next) {
	if (req.user._type === 'Cliente') {
		return next();
	}
	res.redirect('back');
};
