var Note = require('../proxy').Note;
var User = require('../proxy').User;
var validator = require('validator');
var EventProxy = require('eventproxy');

exports.newNote = function (req, res, next) {
	var title 	  = validator.trim(req.body.title);
    var content   = validator.trim(req.body.content);
    var tab 	  = validator.trim(req.body.tab);

    if(req.session && req.session.user) {
    	var author_id = req.session.user._id;

		Note.createNote(title, content, tab, author_id, function(err, note) {
			if(err) {
				return next(err);
			} 
			res.json(note);	
		});
    } else {
    	res.status(403);
    	res.json({error:'Forbidden'});
    }    
};

exports.notes = function (req, res, next) {
	// todo
	Note.notes(function(err, notes) {
		if(err) {
			return next(err);
		}
		res.json(notes);
	});
};

exports.updateNote = function (req, res, next) {
	// todo
};

exports.deleteNote = function (req, res, next) {
	// todo
};