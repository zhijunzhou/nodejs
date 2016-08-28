var User = require('../proxy').User;
var validator = require('validator');
var Eventproxy = require('eventproxy');
var tools = require('../common/tools');
var mail = require('../common/mail');
var utility = require('utility');
var authMiddleWare = require('../middlewares/auth');

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

                // resend active email
                mail.sendActiveMail(user.email, utility.md5(user.email + user.pass + 'time_note'), loginname);

                return res.json({ error: "Forbidden" });
            }

            // set session
            authMiddleWare.gen_session(user, res);

            req.session.user = user;

            res.json({ isSuccess: true, sessionUser: user });

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

                // todo: send active email

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

exports.activeUser = function(req, res, next) {
    var email = validator.trim(req.body.email).toLowerCase();
    var pass  = validator.trim(req.body.pass);
    var ep    = new Eventproxy();

    ep.fail(next);

    ep.on('prop_err', function(msg) {
        res.status(422);
        return res.json({ error: msg });
    });

    function showMessage(status, isSuccess) {
        var data = {
            isSuccess: isSuccess
        };

        res.status(status);
        return res.json(data);
    }

    // validate email
    var getUser = null;
    if (email.indexOf('@') === -1) {
        res.status(400);
        return res.json({ error: "Bad Request" });
    } else {
        getUser = User.getUserByMail;
    }

    // validate password related email
    getUser(email, function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return ep.emit('prop_err');
        }

        var passhash = user.pass;

        tools.bcompare(pass, passhash, ep.done(function(bool) {
            if (!bool) {
                return ep.emit('prop_err');
            }

            if (!user.active) {

                user.active = !user.active;

                user.save(function (err) {
                    if (err) {
                      return next(err);
                    }
                    res.json({isSuccess: true});
                    return;
                });
                
            } else {
                res.json({isSuccess: false});
            }           

        }));
    });

};
