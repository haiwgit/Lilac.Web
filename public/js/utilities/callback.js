define(function () {
    'use strict';

    return function () {
        var count = 0;
        var list = [];

        function tryComplete() {
            count--;
            if (count == 0) {
                for (var i = 0; i < list.length; i++) {
                    list[i]();
                }
            }
        }

        //包装ajax请求的回调函数，返回回调函数的包装
        this.wait = function (fn) {
            if (typeof fn == 'function') {
                count++;
                //回调函数至多包含一个参数
                return function (res) {
                    try {
                        fn(res);
                    }
                    finally {
                        tryComplete();
                    }
                };
            }
        }

        //等待所有回调函数都执行完成之后，才要执行的方法列表
        //complete方法不包含任何参数
        this.complete = function (fn) {
            if (typeof fn == 'function') {
                list.push(fn);
            }
        }
    };
});