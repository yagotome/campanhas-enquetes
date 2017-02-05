(function () {
	'use strict';

	angular
		.module('campanhas-enquetes')
		.controller('MainController', MainController);

	/** @ngInject */
	function MainController(MainService, LoginService, $state, $window) {
		var vm = this;

		console.log($window.localStorage.getItem('token'));

		if ($window.localStorage.getItem('token') == 'undefined') {
			$state.go('login'); // go to login
		}

		vm.createCampaign = function (campaign) {
			var _campaign = angular.copy(campaign);
			_campaign.hashtag = _campaign.hashtag.substring(1);
			_campaign.items.forEach(function (item) {
				item.hashtag = item.hashtag.substring(1)
			});
			MainService.createCampaign(_campaign).then(function (response) {
				console.log('passou', response);
				if (response.data)
					console.log(response.data);
				else
					console.log('error', response);
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
