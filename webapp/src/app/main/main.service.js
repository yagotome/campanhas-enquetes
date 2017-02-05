(function () {
    'use strict';

    angular.module('campanhas-enquetes').factory('MainService', MainService);

    function MainService($http, $backendUrl) {
        var _createCampaign = function (campaign) {
            return $http.post($backendUrl + "/campaign/create", campaign);
        };
        return {
            createCampaign: _createCampaign
        };
    }
})();