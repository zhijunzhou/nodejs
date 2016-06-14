var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// req.session.love = "";
	res.render('index', { title: req.session.username + '-在线学习管理系统' });
});

router.get('/home', function(req, res, next) {
 	res.render('movie');
});

module.exports = router;
