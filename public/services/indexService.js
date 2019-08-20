define(['index-module', 'config'
], function (app, config) {
    'use strict';
    app.factory('indexService', function (http) {
        var svc = {
            getString: function (name, callBack) {
                return http.get(config.getAddress() + '/Foundation/Attachment/getstriing', {params: null});
            },
        };
        return svc;
    });
});