(function () {

  'use strict';

  angular
    .module('app')
    .controller('editarSession', editarSession);

  editarSession.$inject = ['$scope', '$rootScope', 'appService', '$http'];

  function editarSession($scope, $rootScope, appService, $http) {
  	$rootScope.hideSidebar = true;
  	console.log("$RootScope en editSession -> ", $rootScope.UserSession);
  	$scope.mi_perfil = [];
  	//FUNCION PARA OBTENER DATA DE MI USUARIO EN EL MODAL
      $http.get("http://localhost:3000/usuario/"+$rootScope.UserSession.cedula)
      .then(function(response) {
       console.log(response.data);
       angular.copy(response.data, $scope.mi_perfil);
       console.log("$scope.mi_perfil -> ",$scope.mi_perfil.cedula);
        // DANDO VALOR A LOS INPUT
         $scope.mi_cedula = response.data.cedula;
         $scope.mi_nombre = response.data.nombre;
         $scope.mi_apellido = response.data.apellido;
         $scope.mi_password = response.data.password;
         $scope.mi_correo = response.data.correo;
         $scope.mi_telefono = response.data.telefono;
          
      //HACIENDO PUT DE CAMBIOS a BBDD
      $scope.editSession = function(mi_cedula, mi_nombre, mi_apellido, mi_password, mi_correo, mi_telefono){
        console.log("$scope.mi_cedula -> ",$scope.mi_cedula);
        var data = {
        cedula: $scope.mi_cedula,
        nombre: $scope.mi_nombre,
        apellido: $scope.mi_apellido,
        password: $scope.mi_password,
        correo: $scope.mi_correo,
        telefono: $scope.mi_telefono,
     	cargo: response.data.cargo,
     	nivel: response.data.nivel
      }
     	console.log("DATA -> ",data);
        $http.put("http://localhost:3000/usuario/"+$scope.mi_cedula, data)
          .then(function(response) {
            console.log(response.data);
            toastr.success('Cierre sesion y inicie de nuevo', '¡Cambios realizados con exito!');
          });

      }

});     


    


    
  }

})();