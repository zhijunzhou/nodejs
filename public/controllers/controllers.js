define(['angular', 'services','directives', 'AdminLTE'], function(angular, services, directives, AdminLTE) {

    var app = angular.module('controllers', ['highcharts-ng', 'ui.tinymce']);

    app.controller("CommonController", function($scope) {
        $scope.login_url = "login";
        $scope.register = "register";
        $scope.forgetPassword = "forgetPassword";
        $scope.advanceExperience = "newNote";
        $scope.prod_intro = "时间笔记，时间轴上的笔记！";
        $scope.start = "开启时间之旅";
    
    });

    app.controller("HomeController", function($scope) {
    
    });

    app.controller('LoginController', function($scope, UserService, $location) {
        $scope.password = "123456";
        $scope.loginname = "2050588049@qq.com";

        $scope.userLogin = function() {
            var User = UserService.signin();

            User.query({ loginname: $scope.loginname, pass: $scope.password }).$promise.then(function(y) {
                alert('登录成功！');
                // $location.url('/main');
                location.href = "/main";
            $scope.loading = true;
            User.query({ loginname: $scope.loginname, pass: $scope.password }).$promise.then(function(d) {                
                $scope.loading = false;
                sessionStorage.setItem('sessionUser', d.sessionUser);
                $location.url('/main');
            }, function(err) {
                $scope.loading = false;
                if (err.status === 403) {
                    alert('您的邮箱还没有被激活，请先激活邮箱！');
                }
            });
        });
    
        };
    });
    
    app.controller('RegisterController', function($scope, $location, UserService) {
        $scope.password = "123456";
        $scope.repeatpwd = "123456";
        $scope.loginname = "zhi@hp.com";

        $scope.registerUser = function() {
            var User = UserService.signup();

            $scope.loading = true;
            User.save({
                loginname: $scope.loginname,
                pass: $scope.password,
                email: $scope.loginname,
                re_pass: $scope.password
            }).$promise.then(function(y) {
                $scope.loading = false;
                // redirect to login
                $location.url('/login');
            }, function(error) {
                $scope.loading = false;
                if (error.status === 409) {
                    alert('您的邮箱已经被注册过了！');
                }
            });
        };

        $scope.checkPasswords = function() {
            // set customer error
            if ($scope.password === $scope.repeatpwd) {
                document.getElementById("pwd1").setCustomValidity("");
            } else {
                document.getElementById("pwd1").setCustomValidity("两次输入的密码不匹配");
            }
        };

    });

    app.controller('NewNoteController', function($scope, NoteService) {
        $scope.tinymceOptions = {
            handle_event_callback: function(e) {
                console.log(e);
            },
            inline: false,
            skin: 'lightgray',
            theme : 'modern',
            menubar: false,
            statusbar: false
        };
        $scope.content = "Test content";
        $scope.title = "Test title";
        $scope.tab = "Test Tab";

        $scope.newNote = function() {
            var Note = NoteService.createNote();

            Note.save({
                title: $scope.title,
                content:$scope.content,
                tab:$scope.tab
            }).$promise.then(function(y) {
                alert('创建成功！');
            }, function(error) {
                alert('创建失败！');
            });
        };

    });

    app.controller('MainController', function($scope) {
        
    });

    app.controller('StudyCenterController', function($scope) {
        $scope.msg_seed = 1000;
        $scope.the_seed = 2000;

        function mguid() {
            return String(++$scope.msg_seed);
        }

        function tguid() {
            return String(++$scope.the_seed);
        }

        $scope.messageMap = [{
            clientBizId: mguid(),
            clientBizDetail: "CBD #1"
        }, {
            clientBizId: mguid(),
            clientBizDetail: "CBD #2"
        }];

        $scope.projects = [{
            projectId: tguid(),
            projectTitle: "Project 1"
        }, {
            projectId: tguid(),
            projectTitle: "Project #2"
        }];

        $scope.arr = [{
                projectId: "2001", // should be replaced
                projectTitle: "Project #1",
                content: [{
                    clientBizId: '1000',
                    clientBizDetail: "CBD #0", // should be removed
                    value: "0"
                }, {
                    clientBizId: '1001', // shoud be replaced
                    clientBizDetail: "CBD 1",
                    value: "1"
                }]
            }

        ];

        $scope.delMsg = function(index) {
            $scope.messageMap.splice(index, 1);
        };

        $scope.delTheme = function(index) {
            $scope.projects.splice(index, 1);
        };

        $scope.addMsg = function() {
            $scope.messageMap.push({ clientBizId: mguid(), clientBizDetail: "CBD #" + ($scope.messageMap.length + 1) });
        };

        $scope.addTheme = function() {
            $scope.projects.push({ projectId: tguid(), projectTitle: "Project #" + ($scope.projects.length + 1) });
        };

        $scope.init = function() {
            // row: project
            // column: message map
            var columnModel = {};
            // ensure column   
            for (var k = $scope.arr.length - 1; k >= 0; k--) {

                var first = $scope.arr[k].content;

                // delete unused column
                for (var i = first.length - 1; i >= 0; i--) {
                    var flag = false;
                    for (var j = 0; j < $scope.messageMap.length; j++) {
                        if ($scope.messageMap[j].clientBizId === first[i].clientBizId) {
                            flag = true;
                        }
                    }
                    if (flag === false) {
                        // delete $scope.arr[k].content[i];
                        $scope.arr[k].content.splice(i, 1);
                    }
                }

                // update
                $scope.messageMap.forEach(function(m, i) {
                    var index = -1;
                    first.forEach(function(c, j) {
                        if (c.clientBizId === m.clientBizId) {
                            // update
                            index = i;
                            $scope.arr[k].content[j].clientBizDetail = m.clientBizDetail;
                        }
                    });
                    if (index === -1) {
                        // new 
                        $scope.arr[k].content.push({ clientBizId: m.clientBizId, clientBizDetail: m.clientBizDetail, value: "0" });
                    }
                });

                columnModel = first;
            }

            console.log($scope.arr);



            // ensure row

            // delete unused row
            for (var i = $scope.arr.length - 1; i >= 0; i--) {
                var flag = false;
                for (var j = 0; j < $scope.projects.length; j++) {
                    if ($scope.projects[j].projectId === $scope.arr[i].projectId) {
                        flag = true;
                    }
                }
                if (flag === false) {
                    // delete $scope.arr[i];
                    $scope.arr.splice(i, 1);
                }
            }

            console.log($scope.arr);

            // update
            $scope.projects.forEach(function(p, pi) {
                var index = -1;
                $scope.arr.forEach(function(a, ai) {
                    if (p.projectId === a.projectId) {
                        index = pi;
                        $scope.arr[ai].projectTitle = p.projectTitle;
                    }
                });
                if (index === -1) {
                    $scope.arr.push({ projectId: p.projectId, projectTitle: p.projectTitle, content: columnModel });
                }
            });

            console.log($scope.arr);

        };
    });

    return app;
});
