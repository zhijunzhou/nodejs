var Eventproxy	= require('eventproxy');
var News 		= require('../models').News;
var _			= require('lodash');

exports.getNewsById = function (id, callback) {
	var proxy = new Eventproxy();

	News.findOne({_id: id}, proxy.done(function(news) {
		if(!news) {
			proxy.emit('news', null);
			return;
		}
		proxy.emit('news', news);
	}));
};

exports.recentNews = function (callback) {
	
	News.find({}, function (err, recents) {
		callback(err, recents);
	});
};

exports.createNews = function(title, content, tab, authorId, callback) {
	var news 		= new News();

	news.title		= title;
	news.content 	= content;
	news.tab		= tab;
	news.author_id	= authorId;
	
	news.save(callback);
};