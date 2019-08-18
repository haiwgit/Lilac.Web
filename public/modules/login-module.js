define(function () {
    'use strict';
    var app = angular.module("loginModule", ["ui.router", 'ngCookies', 'ngAnimate', 'ui.bootstrap', 'commonModule']);
    app.config(["$stateProvider", "$locationProvider", "$urlRouterProvider",
        function ($stateProvider, $locationProvider, $urlRouterProvide) {
            $urlRouterProvide.otherwise("/login");
            $stateProvider
                .state("/login", {
                    url: "/login",
                    templateUrl: '/template/login.html',
                    controller: 'loginController'
                })
        }]
    )
    return app;
})