var Note = require('../proxy').Note;
var validator = require('validator');

exports.newNote = function (req, res, next) {
	var title 	= validator.trim(req.body.title);
    var content = validator.trim(req.body.content);
    var tab 	= validator.trim(req.body.tab);
    var author_id = req.session.user._id;

	Note.createNote(title, content, tab, author_id, function(err, note) {
		if(err) {
			console.log("创建笔记失败");
			next(err);
		}
		console.log(note);
		console.log("创建成功！");
	});
};

exports.notes = function (req, res, next) {
	// todo
};

exports.updateNote = function (req, res, next) {
	// todo
};

exports.deleteNote = function (req, res, next) {
	// todo
};