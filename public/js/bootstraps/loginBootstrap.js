require([
    'login-module','ctrls/controllers/fullcontroller/loginController'
], function () {
    'use strict';
    angular.bootstrap(document, ['loginModule','commonModule']);
})