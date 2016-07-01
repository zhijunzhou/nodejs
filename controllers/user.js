var User = require('../proxy').User;
var validator = require('validator');
// var uuid           = require('node-uuid');
var Eventproxy = require('eventproxy');
var tools = require('../common/tools');

exports.login = function(req, res, next) {
    var loginname = validator.trim(req.body.loginname);
    var pass = validator.trim(req.body.pass);
    var ep = new Eventproxy();

    ep.fail(next);

    if (!loginname || !pass) {
        res.status(422);
        return res.json({ error: "required infomation was not completed!" });
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

        tools.bcompare(pass, passhash, ep.done(function(bool) {
            if (!bool) {
                return ep.emit('login_error');
            }

            if (!user.active) {
                res.status(403);
                return res.json({ error: "Forbidden" });
            }

            res.json({ isSuccess: true });

        }));
    });
};


exports.newUser = function(req, res, next) {
    // name, loginname, pass, email, avatar_url, active,
    var pass 		= validator.trim(req.body.pass);
    var loginname   = validator.trim(req.body.loginname).toLowerCase();
    var email 		= validator.trim(req.body.email).toLowerCase();
    var rePass 		= validator.trim(req.body.re_pass);

    var ep = new Eventproxy();

    ep.fail(next);
    ep.on('prop_err', function(msg) {
        res.status(422);
        res.json({ error: 'Error:' + msg });
    });

    if (!validator.isEmail(email)) {
        return ep.emit('prop_err', 'email is not valid!');
    }

    if (pass !== rePass) {
        return ep.emit('prop_err', 'the two password are not matched!');
    }

	// check the user existed
    User.countUsersByMail(email, function(err, d) {
        if (err) {
            next(err);
        } else if (d > 0) {
            res.status(409);
            res.json({ error: 'Error: Duplicated email' });
            return;
        } else {            
            tools.bhash(pass, ep.done(function(passhash) {
                var avatar_url = User.makeGravatar(email);

                User.createUser(loginname, loginname, passhash, email, avatar_url, false, function(err, user) {
                    if (err) {
                        return next(err);
                    }
                    res.json(user);
                });
            }));
        }

    });

};
