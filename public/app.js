define(['angular', 'require', 'angular-route','bootstrap','controllers','filters','directives'], function (angular, require) {
    var app = angular.module("SNApp", ['ngRoute','controllers','filters','directives']);

    app.config(function($routeProvider,$locationProvider,$controllerProvider) {

        $routeProvider
            .when('/', {
                controller: "SNController",
                templateUrl:'views/home.html'
            })
            .when('/newscenter', {
                controller: "NewsCenterController",
                templateUrl: 'views/newscenter.html'
            })
            .when('/studycenter', {
                controller: "StudyCenterController",
                templateUrl: 'views/studycenter.html'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    });

    return app;
});

