var express = require('express'),
	router = express.Router(),

	module.export function (app) {
		router.get('/', home.index);

		app.use(router);
	}