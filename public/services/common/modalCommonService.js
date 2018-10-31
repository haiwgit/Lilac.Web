define([
    'common-module'
], function (svc) {
    'use strict';
    svc.factory('dialog', function ($uibModal, $cookies, $timeout, $window) {
        function init(w, h, size, full) {
            var className = 'modal-dialog modal-' + size;
            var modals = $window.document.getElementsByClassName(className);
            if (modals.length == 0) {
                $timeout(function () {
                    init(w, h, size, full)
                }, 30);
                return;
            } 

            var element = angular.element(modals[0]);
            if (full) {
                element.css({
                    'width': '100%',
                    'height': '100%',
                    'margin': '0'
                });
                element.childreen(0).css({
                    'width': '100%',
                    'height': '100%',
                    'background': 'transparent',
                    'border': 'none',
                    'border-radius': 0
                })
            } else {
                if (w > 0) {
                    element.css({ 'width': w + 'px' })
                }
                if (h > 0) {
                    element.css({ 'height': h + 'px' })
                }
            }
        }
        var dialog = {
            open: function (param) {
                var full = typeof param.full == 'boolean' ? param.full : false;
                var w = typeof param.width === 'number' ? param.width : 0;
                var h = typeof param.width === 'number' ? param.height : 0;
                var animation = typeof param.animation == 'boolean' ? param.animation : true;
                var size = w ^ h;
                var modal = $uibModal.open({
                    templateUrl: param.templateUrl,
                    template: param.template,
                    backdrop: param.backdrop,
                    controller: param.controller,
                    resolve: param.resolve,
                    size: size,
                    animation: animation
                });
                modal.opened.then(function () {
                    $timeout(function () {
                        init(w, h, size, full)
                    }, 30)
                })
                return modal;
            }
        };
        return dialog;
    });
});