var Note = require('../proxy').Note;
var validator = require('validator');

exports.newNote = function (req, res, next) {
	var title 	  = validator.trim(req.query.title);
    var content   = validator.trim(req.query.content);
    var tab 	  = validator.trim(req.query.tab);
    var author_id = req.session.user._id;

	Note.createNote(title, content, tab, author_id, function(err, note) {
		if(err) {
			return next(err);
		} 
		res.json(note);	
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