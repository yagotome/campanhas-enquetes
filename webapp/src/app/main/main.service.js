(function () {
    'use strict';

    angular.module('campanhas-enquetes').factory('MainService', MainService);

    function MainService($http, $backendUrl, $cookies) {
        var _createCampaign = function (campaign) {
            return $http.post($backendUrl + '/users/campaign/create', { campaign: campaign, token: $cookies.get('token') });
        };
        var _getUserCampaign = function () {
            return $http.get($backendUrl + '/users/campaign?token=' + $cookies.get('token'));
        };
        var _finishUserCampaign = function () {
            return $http.get($backendUrl + '/users/campaign/finish?token=' + $cookies.get('token'));
        };
        return {
            createCampaign: _createCampaign,
            getUserCampaign: _getUserCampaign,
            finishUserCampaign: _finishUserCampaign
        };
    }
})();