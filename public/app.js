// var app = angular.module("SNApp", []);

// app.controller("SNController", function ($scope, $http) {
//     $scope.message = "Hello, Angular JS.";
// });

define(['angular', 'require', 'angular-route','bootstrap'], function (angular, require) {
    var app = angular.module("SNApp", ['ngRoute']);

    app.controller("SNController", function ($scope, $http) {
        $scope.message = "Hello, Angular JS.";
    });

    app.config(function($routeProvider,$locationProvider) {
        $routeProvider
            .when('/test', {
                controller: "testController",
                templateUrl: 'views/movie.html'
            })
    });
    // app.config(['$routeProvider', '$controllerProvider', function ($routeProvider, $controllerProvider) {
    //     $routeProvider.when('/module1', {
    //         templateUrl: 'module1/tpl.html',
    //         controller: 'module1Controller',
    //         resolve: {
    //             keyName: function ($q) {
    //                 var deferred = $q.defer();
    //                 require(['module1/module1.js'], function (controller) {
    //                     $controllerProvider.register('module1Controller', controller);
    //                     deferred.resolve();
    //                 });
    //                 return deferred.promise;
    //             }
    //         }
    //     }).
    //         otherwise({
    //             redirectTo: '/module1'
    //         });
    // }]);
    return app;
});

