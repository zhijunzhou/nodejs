define(['angular', 'require', 'angular-route','bootstrap','controllers','filters','directives'], function (angular, require) {
    var app = angular.module("TimeNote", ['ngRoute','controllers','filters','directives']);

    app.config(function($routeProvider,$locationProvider,$controllerProvider) {

        $routeProvider
            .when('/', {
                controller: "HomeController",
                templateUrl:'views/tpls/home.html'
            })
            .when('/login', {
                controller: "LoginController",
                templateUrl: 'views/tpls/login.html'
            })
            .when('/studycenter', {
                controller: "StudyCenterController",
                templateUrl: 'views/tpls/studycenter.html'
            })
            .when('/rules', {
                controller: "StudyCenterController",
                templateUrl: 'views/tpls/rules.html'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    });

    return app;
});

