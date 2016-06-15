var User 		= require('../proxy').User;
var validator      = require('validator');
// var uuid           = require('node-uuid');
var Eventproxy     = require('eventproxy');


exports.newUser = function(req, res, next) {
	// name, loginname, pass, email, avatar_url, active,
	var pass		= validator.trim(req.body.pass);
	var loginname	= validator.trim(req.body.loginname).toLowerCase();
	var email		= validator.trim(req.body.email).toLowerCase();
	var rePass		= validator.trim(req.body.re_pass);
	
	var ep = new Eventproxy();
	ep.fail(next);
	ep.on('prop_err', function (msg) {
		res.status(422);
		res.json({error:'Error:' + msg});
	})

	if(!validator.isEmail(email)) {
		return ep.emit('prop_err', 'email is not valid!')
	}

	if(pass !== rePass) {
		return ep.emit('prop_err', 'the two password are not matched!');
	}
	
	User.createUser(loginname, loginname, pass, email, avatar_url, active, function (err, user) {
		if(err) {
			console.log(err);
			return next(err);
		}		
		res.json(user);
	});
	
};