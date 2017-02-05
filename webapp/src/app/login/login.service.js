(function () {
    'use strict';

    angular.module('campanhas-enquetes').factory('LoginService', LoginService);

    function LoginService($http, $backendUrl) {
        var _login = function () {
            return $http.get($backendUrl + '/auth/twitter');
        };
        
        var _checkSession = function (token) {
            return $http.get($backendUrl + '/auth/checkSession/' + token);
        };

        return {
            login: _login,
            checkSession: _checkSession
        };
    }
})();