(function () {
    'use strict';

    angular.module('campanhas-enquetes').factory('LoginService', LoginService);

    function LoginService($http, $backendUrl, $cookies) {
        var _login = function () {
            return $http.get($backendUrl + '/auth/twitter');
        };

        var _checkSession = function () {
            console.log($cookies.get('token'));
            return $http.get($backendUrl + '/auth/checkSession?token=' + $cookies.get('token'));
        };

        return {
            login: _login,
            checkSession: _checkSession
        };
    }
})();