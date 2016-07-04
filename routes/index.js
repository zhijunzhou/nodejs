var express = require('express');
var router = express.Router();
var auth = require('../common/auth');
var user = require('../controllers/user');
var sign = require('../controllers/sign');
var note = require('../controllers/note');

// home page
router.get('/', function(req, res, next) {
	res.render('index', {title:"Time Note"});
});

// user
router.post('/user/create', user.newUser);
router.post('/user/login', user.login);

// note
router.post('/note/create', note.newNote);
router.get('/notes', note.notes);
router.post('/note/update', note.updateNote);
router.get('/note/delete', note.deleteNote);

// refresh the page from one of your sub routes (has nothing to do with ui-router).
// see: http://stackoverflow.com/questions/29936224/page-reload-fails-when-using-angular-ui-router-with-html5-mode-enabled
router.get('*', function(req, res, next) {
	res.render('index', {title:"Time Note"});
});

module.exports = router;
