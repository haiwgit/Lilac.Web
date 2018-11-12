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
            .state("pic", {
                url: "/pic",
                templateUrl: '/template/picManager/pic.html',
                params: {id:null,type:null},
                controller: 'picController'
            })
            .state("blog", {
                url: "/blog",
                templateUrl: '/template/blogManager/blog.html',
                params: {id:null,type:null},
                controller: 'blogController'
            })
            .state("move", {
                url: "/move",
                templateUrl: '/template/videoManager/video.html',
                params: {id:null,type:null},
                controller: 'videoController'
            })
        }
    ]);
    return app;
})