var Note			= require('../models').Note;
var uuid           	= require('node-uuid');
var utility			= require('utility');

exports.createNote = function (title, content, tab, author_id, callback) {
	
	var note 		= new Note();
	
	note.title			= title;
	note.content		= content;
	note.tab			= tab;
	note.author_id		= author_id;

	note.save(callback);
};