(function () {

  'use strict';

  angular
    .module('app')
    .controller('nuevo_encargado', nuevo_encargado);

  nuevo_encargado.$inject = ['$scope', '$rootScope', 'appService'];

  function nuevo_encargado($scope, $rootScope, appService) {
    console.log("nuevo_encargado CONTROLLER");
  }

})();
