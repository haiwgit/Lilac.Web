define([
    'index-module'
], function (svc) {
    'use strict';
    svc.factory('routerService', function ($state) {
        var model = {
            rateModel: {},
            go: function (pramRate, pram) {
                this.rateModel = pramRate;
                $state.go(pramRate.parem, pram)
            }
        }
        return model;
    });
});