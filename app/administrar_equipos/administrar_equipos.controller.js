(function () {

  'use strict';

  angular
    .module('app')
    .controller('administrar_equipos', administrar_equipos);

  administrar_equipos.$inject = ['$scope', '$rootScope', 'appService', '$http', '$location'];

  function administrar_equipos($scope, $rootScope, appService, $http, $location) {
    
    //OBTENER EQUIPOS
    $http.get("http://localhost:3000/equipos")
    .then(function(response) {
        // console.log(response.data);
        $scope.equipos = [];
        angular.copy(response.data, $scope.equipos);
        console.log($scope.equipos);
    });

    //FUNCION PARA OBTENER DATA DE EL EQUIPO EN EL MODAL
    $scope.getData = function(codigo){
      $http.get("http://localhost:3000/equipo/"+codigo)
    .then(function(response) {
       console.log(response.data);
       angular.copy(response.data, $scope.equipo);

       //DANDO VALOR A LOS INPUT
        $scope.Modalnombre = response.data.nombre;
        $scope.Modalcodigo = response.data.codigo;
        $scope.Modaldescripcion = response.data.descripcion;
        $scope.Modalserial_1 = response.data.serial_1;
        $scope.Modalserial_2 = response.data.serial_2;
        $scope.Modalmodelo = response.data.modelo;
        $scope.Modalfecha_compra = response.data.fecha_compra;
        $scope.Modalpais = response.data.ubicacion[0].pais;
        $scope.Modalestado = response.data.ubicacion[0].estado;
        $scope.Modalavenida = response.data.ubicacion[0].avenida;
        $scope.Modalcalle = response.data.ubicacion[0].calle;
        $scope.Modalcodigo_postal = response.data.ubicacion[0].codigo_postal;
        $scope.Modalpunto_referencia = response.data.ubicacion[0].punto_referencia;
      });
    
      //HACIENDO PUT DE CAMBIOS a BBDD
      $scope.putChanges = function(){
        var data = {
        codigo: $scope.Modalcodigo,
        nombre: $scope.Modalnombre,
        descripcion: $scope.Modaldescripcion,
        modelo: $scope.Modalmodelo,
        fecha_compra: $scope.Modalfecha_compra,
        serial_1: $scope.Modalserial_1,
        serial_2: $scope.Modalserial_2,
        ubicacion: {
          pais: $scope.Modalpais,
          estado: $scope.Modalestado,
          avenida: $scope.Modalavenida,
          calle: $scope.Modalcalle,
          codigo_postal: $scope.Modalcodigo_postal,
          punto_referencia: $scope.Modalpunto_referencia
        }
      }

        $http.put("http://localhost:3000/equipo/"+codigo, data)
          .then(function(response) {
            console.log(response.data);
            location.reload()
          });

      }


    }

    //ELIMINAR UN EQUIPO
    $scope.delete = function(codigo){
       $scope.deleteEquipo = function(){
        $http.delete("http://localhost:3000/equipo/"+codigo)
          .then(function(response) {
            console.log(response.data);
            location.reload()
      });
    }
    }

   




}//Controller

})();
