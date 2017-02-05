/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('campanhas-enquetes')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('$backendUrl', 'http://localhost:3000');

})();
