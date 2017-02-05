(function () {
    'use strict';

    angular.module("campanhas-enquetes").factory("LoginInterceptor", LoginInterceptor);

    function LoginInterceptor($q, $location, $rootScope) {
        return {
            request: function (config) {
                var url = config.url;
                if (window.localStorage.getItem('token')) $rootScope.token = window.localStorage.getItem('token');
                if ($rootScope.token) config.headers.token = $rootScope.token;
                // if (url.indexOf('/auth/') < 0) {
                // LoginService.checkSession().then(function (response) {
                //     if (response.status == 200) {
                //         $rootScope.user = response.data.user;
                //         $rootScope.token = response.data.token;
                //     }
                // });
                // }
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401 || rejection.status === 403) {
                    window.localStorage.setItem('user', undefined);
                    window.localStorage.setItem('token', undefined);
                    $location.path("/login");
                }
                return $q.reject(rejection);
            }
        };
    }
})();