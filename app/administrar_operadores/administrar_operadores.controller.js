(function () {

  'use strict';

  angular
    .module('app')
    .controller('administrar_operadores', administrar_operadores);

  administrar_operadores.$inject = ['$scope', '$rootScope', 'appService', '$http'];

  function administrar_operadores($scope, $rootScope, appService, $http) {
     $rootScope.hideSidebar = true;
  	$scope.operadores = [];
  	//OBTENER USUARIOS
     $http.get("http://localhost:3000/usuarios")
    .then(function(response) {
       
       //SACANDO UNICAMENTE LOS OPERADORES
       for (var i = 0; i < response.data.length; i++) {
       	if (response.data[i].nivel == 2) {$scope.operadores.push(response.data[i]);}
       }
      console.log("OPERADORES -> ",$scope.operadores);
   })




    //FUNCION PARA OBTENER DATA DE EL OPERADOR EN EL MODAL
    $scope.getData = function(cedula){
      $http.get("http://localhost:3000/usuario/"+cedula)
      .then(function(response) {
       console.log(response.data);
       angular.copy(response.data, $scope.operador);

       //DANDO VALOR A LOS INPUT
        $scope.Modalcedula = response.data.cedula;
        $scope.Modalnombre = response.data.nombre;
        $scope.Modalapellido = response.data.apellido;
        $scope.Modalcargo = response.data.cargo;
        $scope.Modalcorreo = response.data.correo;
        $scope.ModalTelefono = response.data.telefono;
      });
    
      //HACIENDO PUT DE CAMBIOS a BBDD
      $scope.putChanges = function(){
        var data = {
        cedula: $scope.Modalcedula,
        nombre: $scope.Modalnombre,
        apellido: $scope.Modalapellido,
        cargo: $scope.Modalcargo,
        correo: $scope.Modalcorreo,
        telefono: $scope.ModalTelefono
      }

        $http.put("http://localhost:3000/usuario/"+cedula, data)
          .then(function(response) {
            console.log(response.data);
            location.reload()
          });

      }

     


    }
 //ELIMINAR UN OPERADOR
    $scope.deleteOperador = function(cedula){
      $scope.deleteOp = function(){
         $http.delete("http://localhost:3000/usuario/"+cedula)
          .then(function(response) {
            console.log(response.data);
            location.reload()
      });
          
      }
   
    }

    // OBTENER REPORTES DE UN OPERADOR
    $scope.getReportes = function(operador){
      $scope.OperadorReportes = [];
      $scope.OperadorNombre = operador.nombre +' '+operador.apellido;
      for (var i = 0; i < operador.reportes.length; i++) {
          if (operador.reportes[i].fecha_entrada == '') {
            $scope.OperadorReportes.push(operador.reportes[i]);
          }
      }
      console.log($scope.OperadorReportes);

    }

  }

})();
