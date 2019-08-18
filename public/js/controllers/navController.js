define([
    'index-module',
    'common-filter',
    'common-directive',
    'routerService',
    'ctrls/fullcontroller/indexController',
    'ctrls/fullcontroller/blogController',
    'ctrls/fullcontroller/picController',
    'ctrls/fullcontroller/videoController'
], function (app) {
    'use strict';
    app.controller('navController', function ($rootScope, $scope, $cookies, $http, $stateParams, routerService) {
        $scope.bolgName = "个人网站";
        $scope.currentParem = null;
        $scope.navslist = [];
        $http.get('modules/moduleConfig.json').then(function (res) {
            $scope.navslist = res.data;
        });
        $scope.$watch(function () {
            return routerService.rateModel
        }, function (n, o) {
            if (o != n) {
                $scope.currentParem = routerService.rateModel;
            }
        }, true)

        $scope.ininMe = function () {
            if ($scope.navslist && $scope.navslist.length > 0) {
                $scope.currentParem = $scope.navslist[0];
                $scope.navClick($scope.currentParem);
            }
        }
        $scope.navClick = function (parem) {
            if (parem.rate) {
                routerService.go(parem);
            } else {
                return;
            }
        }
    })
});