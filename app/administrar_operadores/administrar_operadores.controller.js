(function () {

  'use strict';

  angular
    .module('app')
    .controller('administrar_operadores', administrar_operadores);

  administrar_operadores.$inject = ['$scope', '$rootScope', 'appService'];

  function administrar_operadores($scope, $rootScope, appService) {
    console.log("administrar_operadores CONTROLLER");
  }

})();
