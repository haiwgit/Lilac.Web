require([
    'index-module', 'ctrls/navController'
], function () {
    'use strict';
    angular.bootstrap(document, ['indexModule', 'commonModule']);
})