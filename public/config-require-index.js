require.config({
    baseUrl: '/',
    paths: {
        //引入angular
        'angular': '/lib/angular/angular',
        'angular-animate': '/lib/angular/angular-animate',
        'angular-cookies': '/lib/angular/angular-cookies',
        'angular-ui-router': '/lib/angular-ui/angular-ui-router',
        'jquery': '/lib/jquery/jquery-3.3.1.min',
        'ui-bootstrap': '/lib/angular-ui-bootstrap/ui-bootstrap',
        'ui-bootstrap-tpls': '/lib/angular-ui-bootstrap/ui-bootstrap-tpls',
        'crypto': '/lib/crypto/crypto-js',
        'd3':'/lib/d3/d3.v5',
        //配置文件夹
        'ctrls': '/js/controllers',
        'images': '/images',
        'css': '/css',
        'video': '/video',
        'template': '/template',
        'directive': '/directive',
        'filters': '/filters',
        'services': '/services',
        //公共服务
        'config': '/services/config-service',
        'http': '/services/common/httpCommonService',
        'routerService': '/services/common/routerService',
        //模块文件
        'common-module': '/modules/common-module',
        'index-module': '/modules/index-module',
        //过滤器
        'common-filter': '/js/filtres/common-filter',
        //自定义指令
        'common-directive': '/js/directives/common-directive',
        //
        'dialog': '/services/common/modalCommonService',
        'messager': '/services/common/messageCommonService'
    },
    shim: {
        'angular': {exports: 'angular'},
        'angular-animate': ['angular'],
        'angular-cookies': ['angular'],
        'angular-ui-router': ['angular'],
        'ui-bootstrap': ['angular', 'angular-animate'],
        'ui-bootstrap-tpls': ['angular', 'ui-bootstrap'],
        'common-module': ['angular', 'angular-animate', 'ui-bootstrap-tpls'],
        'common-filter': ['common-module'],
        'common-directive': ['common-module'],
        'index-module': ['angular', 'angular-animate', 'angular-cookies', 'angular-ui-router', 'ui-bootstrap-tpls', 'common-module','d3'],
    },
    deps: ['/js/bootstraps/indexBootstrap.js']
});