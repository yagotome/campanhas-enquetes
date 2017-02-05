(function () {
	'use strict';

	angular
		.module('campanhas-enquetes')
		.controller('MainController', MainController);

	/** @ngInject */
	function MainController(MainService, LoginService, $state,  $window, userCampaign, $log) {
		var vm = this;

		if ($window.localStorage.getItem('token') == 'undefined') {
			$state.go('login'); // go to login
		}

		vm.userCampaign = userCampaign;

		vm.createCampaign = function (campaign) {
			var _campaign = angular.copy(campaign);
			_campaign.hashtag = _campaign.hashtag.substring(1);
			_campaign.items.forEach(function (item) {
				item.hashtag = item.hashtag.substring(1)
			});
			MainService.createCampaign(_campaign).then(function (response) {
				if (response.data)
					$log.debug(response.data);
				else
					$log.error('error', response);
			}, function (error) {
				if (error.status == 401) {
					$window.localStorage.setItem('token', undefined);
					$state.go('login');
				}
			});
		};

		vm.campaign = { items: [{}] };
	}

	MainController.prototype.newItem = function (campaign) {
		campaign.items.push({});
	};
})();
