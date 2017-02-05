(function () {
    'use strict';

    angular.module('campanhas-enquetes').factory('MainService', MainService);

    function MainService($http, $backendUrl, $window) {
        var _createCampaign = function (campaign) {
            return $http.post($backendUrl + "/users/campaign/create", { campaign: campaign, token: $window.localStorage.getItem('token') });
        };
        var _getUserCampaign = function () {
            return $http.get($backendUrl + "/users/campaign", { token: $window.localStorage.getItem('token') });
        };
        var _finishUserCampaign = function () {
            return $http.get($backendUrl + "/users/campaign/finish", { token: $window.localStorage.getItem('token') });
        };
        return {
            createCampaign: _createCampaign,
            getUserCampaign: _getUserCampaign,
            finishUserCampaign: _finishUserCampaign
        };
    }
})();