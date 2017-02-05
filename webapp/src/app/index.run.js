(function() {
  'use strict';

  angular
    .module('teste')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
