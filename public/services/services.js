define(['angular', ''], function(angular) {

    var app = angular.module('services', ['ngResource']);

    app.service('UserService', function($resource) {

        this.signup = function(scope) {
            var loginname = scope.loginname;
            var password = scope.password;
            return $resource('/user/create', {}, {
                save: {
                    method: 'POST',
                    params: { loginname: loginname, pass: password, email: loginname, re_pass: password }
                }
            });
        };

        this.signin = function(scope) {
            var loginname = scope.loginname;
            var password = scope.password;

            return $resource('/user/login', {}, {
                query: {
                    method: 'POST',
                    params: {loginname: loginname, pass: password}
                }
            });
        };

    });

    return app;

});
