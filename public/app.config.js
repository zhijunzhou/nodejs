'use strict';
require.config({
    paths:{
        'jquery': 'http://cdn.bootcss.com/jquery/1.12.4/jquery.min',
        'jqValidate':'http://cdn.bootcss.com/jquery-validate/1.12.4/jquery.validate.min',
        'bootstrap': 'http://cdn.bootcss.com/bootstrap/3.3.2/js/bootstrap.min',
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
      '*': {
        'css': 'require-css/css'
      }
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
        },
        jqValidate: {
            deps:[
              'jquery'
          ]
        }
    },
    // urlArgs: "t=" + (new Date()).getTime()
});

// require(['css!css/style']);

function createStyleSheet(url) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = "stylesheet";
    link.href= url;
    document.getElementsByTagName('head')[0].appendChild(link);
}


function loadCss(urls) {
    for(var i = 0;i < urls.length;i++) {
        createStyleSheet(urls[i]);
    }
}

loadCss([
    'http://cdn.bootcss.com/bootstrap/3.3.2/css/bootstrap.min.css',
    'AdminLTE/dist/css/AdminLTE.css',
    'AdminLTE/dist/css/skins/_all-skins.css',
    'css/style.css'
]);

require(["angular","app"],function(angular,app){
    //angularjs start
    angular.bootstrap(document,['TimeNote']);
});