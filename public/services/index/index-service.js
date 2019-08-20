define(['index-module'], function (app) {
    'use strict';

    app.factory('indexService', function (str,http) {
        var s = {
            hello: function (callback) {
                var url = '/Foundation/Attachment/hello?str='+str;
                http.get(url, null, callback);
            },
        }
        return s;
    });
});