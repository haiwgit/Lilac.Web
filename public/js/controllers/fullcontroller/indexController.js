define([
    'index-module', 'dialog', 'messager',
    'ctrls/indexManager/picManger/userController'
], function (app) {
    'use strict';
    app.controller('indexController', function ($scope, $cookies, $window, $http, dialog, messager) {
        $scope.slides = [];
        $scope.slides.push({ imgUrl: '/images/index/carousel/1.jpg', ContenURL: "", ID: 13, text: '亲爱的你，情人节快乐' });
        $scope.slides.push({ imgUrl: '/images/index/carousel/2.jpg', ContenURL: "", ID: 131, text: '亲爱的你，情人节快乐' });
        $scope.slides.push({ imgUrl: '/images/index/carousel/3.jpg', ContenURL: "", ID: 1314, text: '亲爱的你，情人节快乐' });
        $scope.changeData = function (item) {

        }
        $scope.newView = function () {
            var moal = dialog.open({
                templateUrl: '/template/indexManager/picManger/userinfo.html',
                controller: 'userController',
                animation: true,
                backdrop: 'static',
                width: 500,
                resolve: {
                    items: function () {
                        return "12"
                    }
                }
            })
            moal.result.then(function (res) {
            });
        }
        $scope.conform = function () {
            messager.confirm("确认是否继续",function(){
                alert(1)
            })
        }
        $scope.alert = function () {
            messager.alert("输出提示消息")
        }
        $scope.error = function () {
            messager.error('错误信息');
        }
    })
});