'use strict';
require.config({
    paths:{
        jquery: 'http://cdn.bootcss.com/jquery/1.11.2/jquery.min',
        bootstrap: 'http://cdn.bootcss.com/bootstrap/3.3.2/js/bootstrap.min',
        angular: 'http://cdn.bootcss.com/angular.js/1.5.0/angular',
        'angular-route': 'http://cdn.bootcss.com/angular.js/1.5.0/angular-route',
        controllers:'controllers/controllers',
        filters: 'filters/filters',
        directives: 'directives/directives'
    },
    map:{
      
    },
    shim:{
        jquery:{
            exports:'jquery'
        },
        bootstrap:{
          deps:[
              'jquery'
          ],
          exports: 'bootstrap'
        },
        angular:{
            exports:'angular'
        },
        'angular-route':{
            deps: ['angular'],
            exports: 'ngRouteModule'
        }
    }
    // urlArgs: "t=" + (new Date()).getTime()
});

require(["angular","app"],function(angular,app){
    //angularjs start
    angular.bootstrap(document,['SNApp']);
});