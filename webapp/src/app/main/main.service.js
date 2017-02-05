(function () {
    'use strict';

    angular.module('campanhas-enquetes').factory('MainService', MainService);

    function MainService($http, $backendUrl) {
        var _createCampaign = function (campaign) {
            return $http.post($backendUrl + "/users/campaign/create", { campaign: campaign, token: window.localStorage.getItem('token') });
        };
        var _hasCampaign = function (campaign) {
            return $http.get($backendUrl + "/users/campaign/hasAny", { token: window.localStorage.getItem('token') });
        };
        return {
            createCampaign: _createCampaign
        };
    }
})();