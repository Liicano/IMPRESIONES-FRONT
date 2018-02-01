(function () {
'use strict';
 angular
    .module('app')
    .controller('nuevoOperador', nuevoOperador);

  nuevoOperador.$inject = ['$scope', '$rootScope', 'appService'];

  function nuevoOperador($scope, $rootScope, appService) {
    console.log("nuevoOperador CONTROLLER");
  }

})();
