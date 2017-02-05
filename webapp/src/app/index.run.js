(function () {
  'use strict';

  angular
    .module('campanhas-enquetes')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (e, toState, toParams
      , fromState, fromParams) {

      var isLogin = toState.name === "login";
      if (isLogin) {
        return;
      }

      if (!window.localStorage.getItem('token')) {
        e.preventDefault(); // stop current execution
        $state.go('login'); // go to login
      }
    });
  }

})();
