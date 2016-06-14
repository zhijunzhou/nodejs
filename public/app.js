define(['angular', 'require', 'angular-route','bootstrap'], function (angular, require) {
    var app = angular.module("SNApp", ['ngRoute']);

    app.controller("SNController", function ($scope, $http) {

        $scope.sitename = "Hello, Angular JS.";

        $scope.publicMsg = "No Message!";

        $scope.titles = [
            {
                text:'首页',controls:'#home',href:'index',isActive:true
            },
            {
                text:'新闻中心',controls:'#newscenter',href:'newscenter'
            },
            {
                text:'在线学习',controls:'#studycenter',href:'studycenter'
            },
            {
                text:'政策法规',controls:'#rules',href:'rules'
            },
            {
                text:'培训信息',controls:'#training',href:'training'
            },
            {
                text:'公招报名',controls:'#enrollment',href:'enrollment'
            },
            {
                text:'资料下载',controls:'#matirial',href:'matirial'
            },
            {
                text:'关于我们',controls:'#aboutus',href:'aboutus'
            }
        ];

        $scope.developers = [   
            {           
                name: "Jesus", country: "Spain"          
            },           
            {           
                name: "Dave", country: "Canada"          
            },           
            {           
                name: "Wesley", country: "USA"          
            },           
            {           
                name: "Krzysztof", country: "Poland"          
            },
            {           
                name: "allen", country: "china"          
            }           
        ];
    });

    app.directive('recentNews', function() {  
        return {       
            restrict: "E",      
            replace: true,       
            templateUrl: 'components/recentNews.html',
        };
     
    });

    app.directive('userLogin', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'components/login.html',
        };
    });

    app.directive('focus', function() {
        return {
            link: function(scope, element, attrs) {
                element[0].focus();
            }
        };
    });

    app.filter('capitalize', function() {
        return function(input, param) {
            return input.substring(0,1).toUpperCase() + input.substring(1);
        };
    });

    app.config(function($routeProvider,$locationProvider,$controllerProvider) {

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

    app.controller("NewsCenterController", function ($scope, $http) {
        console.log('test multiple controller');
    });

    return app;
});

