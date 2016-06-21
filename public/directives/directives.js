define(['angular'], function (angular) {

	var app = angular.module('directives', []);

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

    return app;

});