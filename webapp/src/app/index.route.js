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
          loggedIn: function (LoginService, $stateParams) {
            LoginService.checkSession(window.localStorage.getItem('token')).then(function (response) {
              if (response.status == 200) return true;
              window.localStorage.setItem('token', undefined);
              window.localStorage.setItem('user', undefined);
              return false;
            });
          }
        }
        // resolve: {
        //   isAuthenticated: function (LoginService) {
        //     LoginService.checkSession().then(function (response) {
        //       if (response.status == 200) return true;
        //       return false;
        //     });
        //   }
        // },
        // onEnter: function () {

        // }
      });

    $stateProvider
      .state('login', {
        url: '/login?token&user',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        onEnter: function ($stateParams) {
          if ($stateParams.token) {
            window.localStorage.setItem('token', $stateParams.token);
            if ($stateParams.user) window.localStorage.setItem('user', $stateParams.user);
            return true;
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
