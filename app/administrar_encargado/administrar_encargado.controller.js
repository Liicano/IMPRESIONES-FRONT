(function () {

  'use strict';

  angular
    .module('app')
    .controller('administrar_encargado', administrar_encargado);

  administrar_encargado.$inject = ['$scope', '$rootScope', 'appService'];

  function administrar_encargado($scope, $rootScope, appService) {
    console.log("administrar_encargado CONTROLLER");
  }

})();
