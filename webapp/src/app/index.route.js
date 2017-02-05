(function () {
	'use strict';

	angular
		.module('campanhas-enquetes')
		.config(routerConfig);

	/** @ngInject */
	function routerConfig($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'app/main/main.html',
				controller: 'MainController',
				controllerAs: 'main',

				resolve: {
					loggedIn: function (LoginService, $cookies) {
						return LoginService.checkSession().then(function (response) {
							return true;
						}, function (error) {
							$cookies.remove('token');
							$cookies.remove('user');
							return false;
						});
					},
					userCampaign: function (MainService, $cookies, loggedIn) {
						if (!loggedIn) return null;
						return MainService.getUserCampaign().then(function (response) {
							return response.data.campaign;
						}, function (error) {
							return null;
						});
					}
				}
			});

		$stateProvider
			.state('login', {
				url: '/login?token&user',
				templateUrl: 'app/login/login.html',
				controller: 'LoginController',
				controllerAs: 'vm',
				onEnter: function ($stateParams, $cookies) {
					if ($stateParams.token) {
						$cookies.put('token', $stateParams.token);
						if ($stateParams.user) $cookies.put('user', $stateParams.user);
						return true;
					}
				}
			});

		$urlRouterProvider.otherwise('/');
	}

})();
