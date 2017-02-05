(function () {
    'use strict';

    angular.module("campanhas-enquetes").factory("LoginInterceptor", LoginInterceptor);

    function LoginInterceptor($q, $location, $rootScope, $window) {
        return {
            request: function (config) {
                if ($window.localStorage.getItem('token')) $rootScope.token = $window.localStorage.getItem('token');
                if ($rootScope.token) config.headers.token = $rootScope.token;                
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401 || rejection.status === 403) {
                    $window.localStorage.setItem('user', undefined);
                    $window.localStorage.setItem('token', undefined);
                    $location.path("/login");
                }
                return $q.reject(rejection);
            }
        };
    }
})();