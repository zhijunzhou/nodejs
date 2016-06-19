
exports.sessionCheck = function (req, res, next) {
	if(!req.session.user) {
		res.status(403);
		return res.json({error:'You are not login.'});
	}
	next();
};