'use strict';
require.config({
    paths:{
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
        'angular': 'http://cdn.bootcss.com/angular.js/1.5.0/angular',
        'angular-route': 'http://cdn.bootcss.com/angular.js/1.5.0/angular-route',
        'angular-resource':'http://cdn.bootcss.com/angular-resource/1.5.0/angular-resource',
        'highcharts':'http://cdn.bootcss.com/highcharts/4.2.5/highcharts',
        'highcharts-ng':'http://cdn.bootcss.com/highcharts-ng/0.0.11/highcharts-ng',
        'tinymce':'tinymce-dist/tinymce.min',
        'ui.tinymce': 'angular-ui-tinymce/dist/tinymce.min',
        'AdminLTE':'AdminLTE/dist/js/app',
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
        'highcharts':{
            deps:['jquery'],
            exports:'Highcharts'
        },
        'angular-route':{
            deps: ['angular']
        },
        'angular-resource':{
            deps: ['angular'],
        },
        'highcharts-ng':{
            deps:['angular','highcharts']
        },
        'tinymce': {
            deps:['jquery']
        },
        'ui.tinymce': {
            deps: ['angular','tinymce']
        },
        'AdminLTE': {
            deps:['jquery','bootstrap']
        }
    }
    // urlArgs: "t=" + (new Date()).getTime()
});

require(["angular","app"],function(angular,app){
    //angularjs start
    angular.bootstrap(document,['TimeNote']);
});