define(['angular', 'require', 'angular-route','angular-resource','highcharts-ng','ui.tinymce','AdminLTE','bootstrap','controllers','filters','directives','services'], function (angular, require) {
    var app = angular.module("TimeNote", ['ngRoute','ngResource','highcharts-ng','controllers','filters','directives','services']);

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
            .when('/newNote', {
                controller: 'NewNoteController',
                templateUrl: 'views/tpls/note.html'
            })
            .when('/main', {
                controller: 'MainController',
                templateUrl: 'views/tpls/main.html'
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

