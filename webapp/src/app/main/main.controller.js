(function () {
	'use strict';

	angular
		.module('campanhas-enquetes')
		.controller('MainController', MainController);

	/** @ngInject */
	function MainController(MainService, LoginService, $state,  $cookies, userCampaign) {
		var vm = this;

		// console.dir($cookies);

		if (!$cookies.get('token')) {
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
				vm.userCampaign = response.data.campaign;
				vm.campaign = null;
			}, function (error) {
				if (error.status == 401) {
					$cookies.remove('token');
					$state.go('login');
				}
			});
		};

		vm.finishCampaign = function (campaign) {
			MainService.finishUserCampaign().then(function (response) {
				vm.userCampaign = null;
				vm.campaign = { items: [{},{}] };
			});
		};

		vm.campaign = { items: [{},{}] };
	}

	MainController.prototype.newItem = function (campaign) {
		campaign.items.push({});
	};
})();
