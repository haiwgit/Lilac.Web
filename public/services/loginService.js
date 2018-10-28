define(['login-module', 'config'
], function (app,config) {
    'use strict';
    app.factory('loginService', function ($http) {
        var svc = {
            signin: function (account, password, callBack) {
                return $http.post(config.getAddress() + '/Sys/Auth/Login',
                    {
                        "account": account,
                        "password": password,
                        "endpoint": "client"
                    });
            },
            getString: function (name, callBack) {
                return $http.get(config.getAddress() + '/Sys/Auth/GetString', { params: { name: name } });
            },
        };
        return svc;
    });
});