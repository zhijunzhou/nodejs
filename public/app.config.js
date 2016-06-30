'use strict';
require.config({
    paths:{
        'jquery': 'http://cdn.bootcss.com/jquery/1.11.2/jquery.min',
        'jqValidate':'http://cdn.bootcss.com/jquery-validate/1.11.1/jquery.validate.min',
        'bootstrap': 'http://cdn.bootcss.com/bootstrap/3.3.2/js/bootstrap.min',
        'angular': 'http://cdn.bootcss.com/angular.js/1.5.0/angular',
        'angular-route': 'http://cdn.bootcss.com/angular.js/1.5.0/angular-route',
        'angular-resource':'http://cdn.bootcss.com/angular-resource/1.5.0/angular-resource.js',
        'highcharts':'http://cdn.bootcss.com/highcharts/4.2.5/highcharts',
        'controllers':'controllers/controllers',
        'filters': 'filters/filters',
        'directives': 'directives/directives',
        'services':'services/services'
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
            deps: ['angular']
        },
        'angular-resource':{
            deps: ['angular']
        },
        'highcharts-ng':{
            deps:['highcharts'],
            exports:'ngHighcharts'
        },
        jqValidate: {
            deps:[
              'jquery'
          ]
        }
    }
    // urlArgs: "t=" + (new Date()).getTime()
});

require(["angular","app"],function(angular,app){
    //angularjs start
    angular.bootstrap(document,['TimeNote']);
});