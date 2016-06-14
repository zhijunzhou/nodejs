var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/node_org', {server:{poolsize:20}}, function (err) {
	if(err) {
		console.log('connect to db error: %s', err.message);
		process.exit(1);
	}
	console.log('connect to mongodb successfully!');
});

require('./news');

exports.News = mongoose.model('News');