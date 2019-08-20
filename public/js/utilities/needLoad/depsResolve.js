define(function () {

    'use strict';

    //已加载的模块数组
    var loadedModules = [];

    return function resolveDeps(moduleName, depFiles) {
        return {
            loadModule: ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {
                var deferred = $q.defer();

                //加载模块依赖
                function loadDependencies(dependencies) {
                    //加载该模块中对应的依赖
                    if (dependencies && dependencies.length > 0) {
                        $ocLazyLoad.load(dependencies).then(function () {
                            deferred.resolve();
                        });
                    } else {
                        deferred.resolve();
                    }
                }

                /*判断angular模块系统中是否已经加载过该模块，
                  如果该模块未加载，先加载模块，然后加载依赖；
                  如果模块已经加载，直接加载依赖*/
                var isLoaded = (loadedModules.indexOf(moduleName) > -1);
                if (isLoaded) {
                    //加载该模块中对应的依赖
                    loadDependencies(depFiles);
                } else {
                    //加载模块
                    $ocLazyLoad.load([moduleName]).then(function () {
                        //将模块名称存入已加载模块列表中
                        loadedModules.push(moduleName);
                        //加载该模块中对应的依赖
                        loadDependencies(depFiles);
                    });
                }
                return deferred.promise;
            }]
        };
    };
});