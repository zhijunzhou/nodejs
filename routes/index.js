var express = require('express');
var router = express.Router();
var auth = require('../common/auth');
var news = require('../controllers/news');
var user = require('../controllers/user');
var sign = require('../controllers/sign');

// home page
router.get('/', function(req, res, next) {
	res.render('index', {title:"Time Note"});
});

router.get('/login', function(req, res, next) {
	res.render('login');
});

// user
router.post('/user/create',auth.sessionCheck, user.newUser);
router.post('/user/login', user.login);

// news
router.get('/news', news.getRecent);
router.post('/news/create', news.createNews);

module.exports = router;
