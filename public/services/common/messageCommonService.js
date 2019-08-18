define([
    'common-module'
], function (svc) {
    'use strict';
    svc.controller('messager-controller', messagerController)
        .factory('messager', messagerService)
        .constant('MessagerIcon', {
            None: 0,
            Information: 1,
            StopSign: 2,
            Exclamation: 3,
            Question: 4,
            Errro: 5,
            Success: 6,
        })
        .constant('MessagerButton', {
            OK: 0,
            Concel: 1,
            OKCancel: 2,
            YesNo: 3,
            YesNoCancel: 4,
            OKCancelApply: 5,
            RetryCancel: 6,
            AbortRetyIgnore: 7

        });

    function messagerController($scope, $uibModalInstance, $timeout, $sce, MessagerIcon, MessagerButton, values) {
        $scope.ok = function () {
            if (typeof values.callback === 'function') {
                values.callback();
            } else {
                $uibModalInstance.close();
            }
        }
        $scope.cancel = function () {
            if (typeof values.cancelCallback === 'function') {
                values.cancelCallback();
            } else {
                $uibModalInstance.dismiss();
            }
        }
        $scope.modal = {};
        $scope.modal.Title = values.title;
        //$scope.trustAsHtml  需要传入的string类型的参数
        if (values.msg && typeof values.msg !== 'string') {
            values.msg = values.msg.toString();
        }
        $scope.modal.Text = $sce.trustAsHtml(values.msg);
        switch (values.icon) {
            case MessagerIcon.Information:
                $scope.modal.Icon = 'images/alert.png';
                break;
            case MessagerIcon.Question:
                $scope.modal.Icon = 'images/alert.png';
                break;
            case MessagerIcon.Errro:
                $scope.modal.Icon = 'images/alert.png';
                break;
            case MessagerIcon.None:
                break;
        }
        $scope.show = {
            Btns: false,
            OK: false,
            Cancel: false,
        }
        switch (values.btns) {
            case MessagerButton.OK:
                $scope.show.OK = true;
                break;
            case MessagerButton.OKCancel:
                $scope.show.OK = true;
                $scope.show.Cancel = true;
                break;
        }
        if (values.autoClose) {
            $timeout(function () {
                $uibModalInstance.dismiss();
            }, values.millisec || 1200)
        } else {
            $scope.show.Btns = true;
        }
    }

    function messagerService($uibModal, MessagerIcon, MessagerButton) {
        var messager = {
            alert: function (msg, millisec) {
                showMessager($uibModal, '提示信息', msg, millisec, MessagerIcon.Information, MessagerButton.OK);
            },
            confirm: function (msg, callback, cancelCallback) {
                showMessager($uibModal, '提示信息', msg, 0, MessagerIcon.Question, MessagerButton.OKCancel, callback, cancelCallback);
            },
            error: function (msg, millisec) {
                showMessager($uibModal, '警告', msg, millisec, MessagerIcon.Errro, MessagerButton.OK);
            }

        }
        return messager;
    }

    function showMessager(modal, title, msg, millisec, icon, btns, callback, cancelCallback) {
        var autoClose = millisec !== 0;
        modal.open({
            templateUrl: 'template/common/messager.html',
            backdrop: 'static',
            size: 400,
            controller: 'messager-controller',
            resolve: {
                values: function () {
                    return {
                        title: title,
                        msg: msg,
                        millisec: millisec,
                        autoClose, autoClose,
                        icon: icon,
                        btns: btns,
                        callback: callback,
                        cancelCallback: cancelCallback
                    }
                }
            }
        })
    }
});