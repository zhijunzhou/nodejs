var express = require('express');
var router = express.Router();
var news = require('../controllers/news');

/* GET home page. */
router.get('/', function(req, res, next) {
	// req.session.love = "";
	res.render('index', { title: req.session.username + '-在线学习管理系统' });
});

router.get('/home', function(req, res, next) {
 	res.render('movie');
});

router.get('/news', news.getRecent);

module.exports = router;
