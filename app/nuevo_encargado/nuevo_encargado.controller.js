(function () {

  'use strict';

  angular
    .module('app')
    .controller('nuevo_encargado', nuevo_encargado);

  nuevo_encargado.$inject = ['$scope', '$rootScope', 'appService', '$http'];

  function nuevo_encargado($scope, $rootScope, appService, $http) {
     $rootScope.hideSidebar = true;
  
  

  


  }

})();


