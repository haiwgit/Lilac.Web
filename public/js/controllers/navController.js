define([
    'index-module',
    'common-filter',
    'common-directive',
    'ctrls/fullcontroller/indexController',
    'ctrls/fullcontroller/blogController',
    'ctrls/fullcontroller/picController',
    'ctrls/fullcontroller/videoController'
], function(app) {
    'use strict';
    app.controller('navController',function($scope,$cookies, $state, $http){
        $scope.bolgName = "个人网站";
        $scope.currentParem = null;
        $scope.navslist = [];
        $http.get('modules/moduleConfig.json').then(function (res) {
            $scope.navslist = res.data;
        })
        $scope.ininMe = function () {
            if ($scope.navslist && $scope.navslist.length > 0) {
                $scope.currentParem = $scope.navslist[0];
                $scope.navClick($scope.currentParem);
            }
        }
        $scope.navClick = function (parem) {
            if (parem.rate) {
                $scope.currentParem = parem;
                $state.go($scope.currentParem.parem)
            } else {
                return;
            }
        }
    })
});