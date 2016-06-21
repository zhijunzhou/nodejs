define(['angular', 'require', 'angular-route','bootstrap','controllers','filters','directives'], function (angular, require) {
    var app = angular.module("SNApp", ['ngRoute','controllers','filters','directives']);

    app.config(function($routeProvider,$locationProvider,$controllerProvider) {

        function ctrlRegister(ctrlName, ctrlModule) {
            return function($q) {
                var defer = $q.defer();
                require(ctrlModule, function(controller) {
                    $controllerProvider.register(ctrlName, controller);
                    defer.resolve();
                });
                return defer.promise;
            }
        }

        $routeProvider
            .when('/', {
                controller: "SNController",
                templateUrl:'views/home.html'
            })
            .when('/index', {
                controller: "SNController",
                templateUrl:'views/home.html'
            })
            .when('/newscenter', {
                controller: "NewsCenterController",
                templateUrl: 'views/movie.html'
            })
            .otherwise({
                redirectTo: '/index'
            });

        $locationProvider.html5Mode(true);
    });

    // app.controller("NewsCenterController", function ($scope, $http) {
    //     console.log('test multiple controller');
    // });

    return app;
});

