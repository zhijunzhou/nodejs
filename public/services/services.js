define(['angular'], function (angular) {

	var app = angular.module('services', []);

	app.service('UserService', function() {
        this.signup = function (x) {
	        return x.toString(16);
	    }
    });

    return app;

});