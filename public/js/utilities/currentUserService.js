define(function () {
    'use strict';

    var json = sessionStorage.getItem('loginUser');
    if (typeof json == 'undefined' || json == null) {
        return null;
    }
    var user = JSON.parse(json);
    if (user && user.LoginResult) {
        return user.LoginResult;
    } else {
        return null;
    }
});