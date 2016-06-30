define(['angular', 'require', 'angular-route','bootstrap','controllers','filters','directives','services'], function (angular, require) {
    var app = angular.module("TimeNote", ['ngRoute','controllers','filters','directives','services']);

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
            .when('/register', {
                controller: "RegisterUserController",
                templateUrl: 'views/tpls/register.html'
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

