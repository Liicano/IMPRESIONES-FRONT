(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', homeController);

  homeController.$inject = ['$scope', '$rootScope', 'appService', '$http'];

  function homeController($scope, $rootScope, appService, $http) {
     //OBTENER EQUIPOS
    $http.get("http://localhost:3000/equipos")
    .then(function(response) {
        // console.log(response.data);
        $scope.equipos = [];
        angular.copy(response.data, $scope.equipos);
        $scope.cantidad_equipos = $scope.equipos.length;
        console.log($scope.cantidad_equipos);

        //CANTIDAD DE EQUIPOS DISPONIBLES
        $scope.cantidad_disponibles = 0;
        $scope.cantidad_mantenimiento = 0;
        $scope.cantidad_fueraservicio = 0;
        for (var i = 0; i < $scope.equipos.length; i++) {
          if ($scope.equipos[i].estado_equipo == 'DISPONIBLE') $scope.cantidad_disponibles++; 
          if ($scope.equipos[i].estado_equipo == 'MANTENIMIENTO') $scope.cantidad_mantenimiento++; 
          if ($scope.equipos[i].estado_equipo == 'FUERA_SERVICIO') $scope.cantidad_fueraservicio++; 
        };
        console.log($scope.cantidad_disponibles);

    });



  }

})();
