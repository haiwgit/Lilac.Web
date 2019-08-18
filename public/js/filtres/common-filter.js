define([
    'common-module'
], function (app) {
    'use strict';
    app.filter('limitLength', function () {
        return function (input, len) {
            if (typeof input === 'string' && typeof len === 'number') {
                if (len <= 0) {
                    return '...';
                }
                var currentlen = 0, showlen = 0;
                while (showlen < input.length && currentlen <= len) {
                    var c = input.charCodeAt(showlen);
                    var k = c <= 127 ? 1 : 2;
                    if (currentlen + k <= len) {
                        currentlen += k;
                        showlen++;
                    } else {
                        return input.substring(0, showlen) + '...';
                    }
                }
            }
            return input;
        };
    })
        .filter('trustUrl', function ($sce) {
            return function (recordingUrl) {
                return $sce.trustAsResourceUrl(recordingUrl);
            };
        })
});