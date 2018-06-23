(function () {

  'use strict';

  angular
    .module('app')
    .controller('administrar_encargado', administrar_encargado);

  administrar_encargado.$inject = ['$scope', '$rootScope', 'appService', '$http'];

  function administrar_encargado($scope, $rootScope, appService, $http) {
       $rootScope.hideSidebar = true;
       
      


  }

})();
