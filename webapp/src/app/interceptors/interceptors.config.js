(function () {
    'use strict';

    angular.module("campanhas-enquetes").config(function ($httpProvider) {
        $httpProvider.interceptors.push("LoginInterceptor");
    });
})();