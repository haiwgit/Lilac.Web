define([
    'login-module', 'crypto', 'services/login/login-service'
], function (app, crypto) {
    'use strict';
    app.controller('loginController', function ($scope, $cookies, loginService) {
        var userModel = {
            account: '',
            password: '',
            RememberMe: false
        };

        $scope.User = userModel;
        var userData = localStorage.getItem('userData');
        if (userData) {
            var userObj = JSON.parse(userData);
            userModel.account = userObj.account;
            userModel.password = userObj.password;
            userModel.RememberMe = true;
        }
        $scope.nextStep = function ($event, next) {
            if ($event.keyCode == 13) {
                $event.preventDefault();
                if (next == 'password') {
                    if (userModel.account && userModel.password)
                        $scope.login();
                    else if (userModel.account)
                        document.getElementById(next).focus();
                }
                ;
                if (next == 'submit' && userModel.account && userModel.password) {
                    $scope.login();
                }
                ;
            }
        };
        //记住我
        $scope.torememberme = function () {
            $scope.User.RememberMe = !$scope.User.RememberMe;
        };


        $scope.login = function () {
            $scope.isload = true;
            if (userModel.account && userModel.password) {
                var cryptPSW = crypto.SHA256(userModel.password).toString(crypto.enc.Hex);
                loginService.signin(userModel.account, cryptPSW).success(function (res) {
                    $scope.isload = true;
                    var loginUser = res.LoginResult;
                    sessionStorage.setItem('loginUser', JSON.stringify(loginUser));

                    //保存当前身份票据
                    var authID = res.ticket;
                    $cookies.put('AUTH_ID', authID);
                    if ($scope.User.RememberMe) {
                        //将用户名和密码保存到本地存储
                        localStorage.setItem('userData', JSON.stringify({
                            account: userModel.account,
                            password: userModel.password
                        }));
                    }
                    else {
                        //移除存储的登录信息
                        localStorage.removeItem('userData');
                    }
                    location.href = '/index';
                }).error(function () {
                    $scope.isload = false;
                    $scope.loginMessage = '登录失败。';
                });
            }
        }
    })
});