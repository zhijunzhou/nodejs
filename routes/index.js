var express = require('express');
var router = express.Router();
var news = require('../controllers/news');
var user = require('../controllers/user');

// home page
router.get('/', function(req, res, next) {
	res.render('index', {title:"System"});
});

// user
router.post('/user/create', user.newUser);
router.post('/user/login', user.login);

// news
router.get('/news', news.getRecent);
router.post('/news/create', news.createNews);

module.exports = router;
