define(['angular'], function (angular) {
    return function($scope){
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
    };
});