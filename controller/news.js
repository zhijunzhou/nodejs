var News 		= require('../proxy').News;
var EventProxy   = require('eventproxy');
var _           = require('lodash');


exports.showEdit = function (req, res, next) {
	var news_id = req.params.nid;

	News.getNewsById(news_id, function(err,news) {
		if(!news) {
			res.render404('resource not found!');
			return;
		}
		res.render('news', {news: news});
	});
};

exports.createNews = function(req, res, next) {
	var title		= req.body.title || 'test';
	var tab			= req.body.tab || 'test';
	var content		= req.body.content || 'test';
	var author_id	= "test";

	News.createNews(title, content, tab, author_id, function(err, news) {
		if(err) {
			return next(err);
		}

		console.log('saved successfully!');
	});
};