define(function () {
    'use strict';
    var app = angular.module("indexModule", ["ui.router", 'ngCookies', 'ngAnimate', 'ui.bootstrap', 'commonModule']);
    app.config(["$stateProvider", "$locationProvider", "$urlRouterProvider",
        function ($stateProvider, $locationProvider, $urlRouterProvide) {
            $urlRouterProvide.otherwise("/");
            $locationProvider.hashPrefix("");
            $stateProvider
            .state("index", {
                url: "/index",
                templateUrl: '/template/indexManager/main.html',
                controller: 'indexController'
            })
            .state("blog", {
                url: "/blog",
                templateUrl: '/template/blogManager/blog.html',
                controller: 'blogController'
            })
        }
    ]);
    return app;
})