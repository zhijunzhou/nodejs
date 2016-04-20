//
// user router
//

exports.register = function (req, res) {
    res.render('user/register',{title:'注册用户'});
}

exports.login = function (req, res) {
    res.render('index');
}
