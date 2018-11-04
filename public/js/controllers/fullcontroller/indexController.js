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
        $scope.news = [];
        $scope.news.push({ TEXT: '程序员成功研发去马赛克神器 高清无码效果感人', ID: 1 });
        $scope.news.push({ TEXT: 'IDC：全球智能手机出货量连续四个季度下滑', ID: 2 });
        $scope.news.push({ TEXT: '手机电池进步太慢，iPhoneXS续航还比不上iP', ID: 3 });
        $scope.news.push({ TEXT: '为什么你的手机信号突然变差了', ID: 4 });
        $scope.news.push({ TEXT: 'Surface性能飙升 微软新品发布会重点都有啥', ID: 5 });
        $scope.news.push({ TEXT: '新一代Kindle发布 这些亮点能否激起你的购买欲', ID: 6 });
        $scope.news.push({ TEXT: '联想入局滑盖全面屏手机竞争 概念股普涨', ID: 7 });
        $scope.news.push({ TEXT: '荣耀Magic2携智慧生命体YOYO，普通人也能当', ID: 8 });
        $scope.news.push({ TEXT: '谷歌目前还无法解决Android碎片化问题', ID: 9 });
        $scope.news.push({ TEXT: '微软发首款Surface耳机:支持降噪随时唤醒', ID: 10 });
        $scope.news.push({ TEXT: '谷歌安卓App新规生效：老应用该更新了', ID: 11 });
        $scope.showNews = function (parm) {
            var temp = {
                templateUrl: '/template/indexManager/picManger/userinfo.html',
                controller: 'userController',
                animation: true,
                backdrop: 'static',
                width: 500,
                data:parm,
                type:'news'
            }
            $scope.newView();
        }
        $scope.newView = function (temp) {
            var moal = dialog.open({
                templateUrl: temp.templateUrl,
                controller: temp.controller,
                animation: true,
                backdrop: 'static',
                width: temp.width,
                resolve: {
                    items: function () {
                        return temp.data
                    }
                }
            })
            moal.result.then(function (res) {
            });
        }
        $scope.conform = function () {
            messager.confirm("确认是否继续", function () {
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