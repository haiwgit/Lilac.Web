define(['index-module','http'], function (app) {
    'use strict';

    app.factory('indexService', function (http) {
        var s = {
            hello: function (str,callback) {
                var url = '/Foundation/Attachment/getstriing';
                http.get(url, null, callback);
            },
        }
        return s;
    });
});