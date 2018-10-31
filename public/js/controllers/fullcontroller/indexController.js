define([
    'index-module', 'dialog',
    'ctrls/indexManager/picManger/userController'
], function (app) {
    'use strict';
    app.controller('indexController', function ($scope, $cookies, $window, $http, dialog) {
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
                width:500,
                resolve: {
                    items: function () {
                        return "12"
                    }
                }
            })
            moal.result.then(function (res) {
            });
        }
    })
});