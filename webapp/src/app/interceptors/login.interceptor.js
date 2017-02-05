(function () {
    'use strict';

    angular.module("campanhas-enquetes").factory("LoginInterceptor", LoginInterceptor);

    function LoginInterceptor($q, $location, $rootScope, $cookies) {
        return {
            request: function (config) {
                if ($cookies.get('token')) $rootScope.token = $cookies.get('token');
                if ($rootScope.token) config.headers.token = $rootScope.token;                
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401 || rejection.status === 403) {
                    $cookies.remove('user');
                    $cookies.remove('token');
                    $location.path("/login");
                }
                return $q.reject(rejection);
            }
        };
    }
})();