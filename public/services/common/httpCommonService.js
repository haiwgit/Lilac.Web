define(['login-module','config'], function (svc,config) {
    'use strict';
    svc.factory('http', function ($http, $cookies, $window) {
        var authID = $cookies.get('AUTH_ID');
        var hostAddress = config.getAddress();
        var hearders = {
            'Content-Type': 'application/json;charset=UTF-8',
            'AUTH_ID': authID
        }
        function onError(ex, statusCode) {
            if (statusCode == 403) {
                //$cookies.remove('AUTH_ID');
                //$window.location.replace('/src/modules/common/views/timeout.html');
            } else { }
        }
        function fn(callback) {
            return typeof callback === "function" ? callback : angular.noop;
        }
        var http = {
            get: function (url, queryParams, callback) {
                $http.get(hostAddress + url, {
                    params: queryParams,
                    hearders: hearders
                }).success(fn(callback)).error(onError)
            },
            post:function(url,data,callback,queryParams){
                $http.post(hostAddress + url,data,{
                    params: typeof queryParams==="undefined"?null:queryParams,
                    hearders: hearders
                }).success(fn(callback)).error(onError)
            }
        }
        return http;
    });
    return svc;
});