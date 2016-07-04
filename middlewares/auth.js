var config = require('../config');

function gen_session(user, res) {
    var auth_token = user._id + '$$$$';
    var opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true
    };
    res.cookie(config.auth_cookie_name, auth_token, opts);
}

exports.gen_session = gen_session;

