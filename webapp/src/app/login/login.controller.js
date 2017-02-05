(function () {
	'use strict';

	angular
		.module('campanhas-enquetes')
		.controller('LoginController', LoginController);

	/** @ngInject */
	function LoginController(LoginService, $rootScope, $state, $cookies) {
		// var vm = this;

		if ($cookies.get('token')) {
			$state.go('home');
		}
		// vm.login = function() {
		// 	LoginService.login().then(function (response) {
		// 		console.dir(response);
		// 		if (response.status == 200) {
		// 			$rootScope.user = response.data.user;
		// 			$rootScope.token = response.data.token;
		// 		}
		// 	});
		// };
	}
})();
