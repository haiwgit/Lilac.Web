require([
    'login-module','ctrls/fullcontroller/loginController'
], function () {
    'use strict';
    angular.bootstrap(document, ['loginModule','commonModule']);
})