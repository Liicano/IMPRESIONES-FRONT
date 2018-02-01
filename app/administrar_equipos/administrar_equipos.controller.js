(function () {

  'use strict';

  angular
    .module('app')
    .controller('administrar_equipos', administrar_equipos);

  administrar_equipos.$inject = ['$scope', '$rootScope', 'appService'];

  function administrar_equipos($scope, $rootScope, appService) {
    console.log("administrar_equipos CONTROLLER");
  }

})();
