var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '未定义-在线学习管理系统' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: '未定义-在线学习管理系统' });
});

module.exports = router;
