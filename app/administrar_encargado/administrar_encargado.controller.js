(function () {

  'use strict';

  angular
    .module('app')
    .controller('administrar_encargado', administrar_encargado);

  administrar_encargado.$inject = ['$scope', '$rootScope', 'appService', '$http'];

  function administrar_encargado($scope, $rootScope, appService, $http) {
       $rootScope.hideSidebar = true;
       
      $scope.encargados = [];
    //OBTENER USUARIOS
     $http.get("http://localhost:3000/usuarios")
    .then(function(response) {
       
       //SACANDO UNICAMENTE LOS OPERADORES
       for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].nivel == 1) {$scope.encargados.push(response.data[i]);}
       }
      console.log("encargados -> ",$scope.encargados);
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





//ELIMINAR UN ENCARGADO
    $scope.deleteEncargado = function(cedula){
      $scope.deleteOp = function(){
         $http.delete("http://localhost:3000/usuario/"+cedula)
          .then(function(response) {
            console.log(response.data);
            location.reload()
      });
          
      }
   
    }





  }

})();
