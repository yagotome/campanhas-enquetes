(function () {
	'use strict';

	angular
		.module('campanhas-enquetes')
		.controller('MainController', MainController);

	/** @ngInject */
	function MainController(MainService, LoginService) {
		var vm = this;

		if (!window.localStorage.getItem('token')) {
			$state.go('login'); // go to login
		}

		vm.createCampaign = function (campaign) {
			MainService.createCampaign(campaign).then(function (response) {
				if (response.data)
					console.log(response.data);
				else
					console.log('error', response);
			});
		};

		vm.campaign = { items: [] };
	}

	MainController.prototype.newItem = function (campaign) {
		campaign.items.push({});
	};
})();
