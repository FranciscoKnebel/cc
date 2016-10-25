module.exports = function isAdmin(req, res, next) {
	if (req.user.__t === "Administrador") {
		return next();
	}
	res.redirect('back');
};
