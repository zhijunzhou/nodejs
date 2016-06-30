var User 		= require('../proxy').User;
var validator      = require('validator');
// var uuid           = require('node-uuid');
var Eventproxy     = require('eventproxy');
var tools          = require('../common/tools');

exports.login = function(req, res, next){
	var loginname	= validator.trim(req.query.loginname);
	var pass 		= validator.trim(req.query.pass);
	var ep 			= new Eventproxy();

	ep.fail(next);

	if(!loginname || !pass) {
		res.status(422);
		return res.json({error:"required infomation was not completed!"});
	}

	var getUser = null;
	if (loginname.indexOf('@') !== -1) {
		getUser = User.getUserByMail;
	} else {
		getUser = User.getUserByLoginName;
	}

	getUser(loginname, function(err, user) {
		if (err) {
	      return next(err);
	    }
	    if (!user) {
	      return ep.emit('login_error');
	    }

	    var passhash = user.pass;

	    tools.bcompare(pass, passhash, ep.done(function(bool){
	    	if(!bool) {
	    		return ep.emit('login_error');
	    	}

	    	if(!user.active) {
	    		res.status(403);
	    		return res.json({error:"Forbidden"});
	    	}

	    	res.json({isSuccess: true});

	    }));
	});
};


exports.newUser = function(req, res, next) {
	// name, loginname, pass, email, avatar_url, active,
	var pass		= validator.trim(req.query.pass);
	var loginname	= validator.trim(req.query.loginname).toLowerCase();
	var email		= validator.trim(req.query.email).toLowerCase();
	var rePass		= validator.trim(req.query.re_pass);
	
	var ep = new Eventproxy();
	ep.fail(next);
	ep.on('prop_err', function (msg) {
		res.status(422);
		res.json({error:'Error:' + msg});
	});

	if(!validator.isEmail(email)) {
		return ep.emit('prop_err', 'email is not valid!');
	}

	if(pass !== rePass) {
		return ep.emit('prop_err', 'the two password are not matched!');
	}

	
	
	// TODO: check the user existed
	tools.bhash(pass, ep.done(function(passhash) {
		var avatar_url = User.makeGravatar(email);

		User.createUser(loginname, loginname, passhash, email, avatar_url, false, function (err, user) {
			if(err) {
				console.log(err);
				return next(err);
			}
			res.json(user);
		});
	}));

	
	
};