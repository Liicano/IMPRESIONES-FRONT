(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', homeController);

  homeController.$inject = ['$scope', '$rootScope', 'appService', '$http', '$cookies', '$location'];

  function homeController($scope, $rootScope, appService, $http, $cookies, $location) {
// ==========================================================================================================
// DATA DE LA SESSION
// ==========================================================================================================
    
    // SESSION
    $rootScope.logout = function(){
      appService.logout();
      $rootScope.hideSidebar = false;
    }

    $rootScope.hideSidebar = true;
    $rootScope.UserSession = [{
      cedula: $cookies.getObject('usuario').cedula,
      nombre: $cookies.getObject('usuario').nombre,
      apellido: $cookies.getObject('usuario').apellido,
      correo: $cookies.getObject('usuario').correo
    }];

    // ============================================
    angular.copy($cookies.getObject('usuario'), $rootScope.UserSession);
    console.log("$rootScope.UserSession -> ",$rootScope.UserSession);
    console.log("$rootScope.UserSession.nivel -> ",$rootScope.UserSession.nivel);
    if ($rootScope.UserSession.nivel == 0) {$rootScope.isAdmin = true;}else{$rootScope.isAdmin = false;}
    console.log("$rootScope.isAdmin -> ",$rootScope.isAdmin);

// ==========================================================================================================
// ==========================================================================================================


// DATATABLE DE PRUEBA

$scope.datos_tabla = new Object();

 // $http.get("http://localhost:3000/documentos")
 //    .then(function(documento) {
 //      $rootScope.documentos = [];
 //      angular.copy(documento.data, $rootScope.documentos);
      
    

 //  $rootScope.documentos.forEach(function(documento) {
 //        $scope.cedula_emisor = documento.usuario_emisor;

 //        $http.get("http://localhost:3000/usuario/"+$scope.cedula_emisor)
 //          .then(function(usuario) {
 //            $scope.userData = [];
 //            angular.copy(usuario.data, $scope.userData);
 //            console.log($scope.userData);
 //              $scope.datos_tabla.push(documento.codigo);     
 //              $scope.datos_tabla.push(documento.nombre);  
 //              $scope.datos_tabla.push(documento.tipo_documento);     
 //              $scope.datos_tabla.push(documento.estado);    
 //              $scope.datos_tabla.push($scope.userData.nombre +' '+ $scope.userData.apellido);     
 //              $scope.datos_tabla.push('asd');    
 //              $scope.datos_tabla.push('1');
 //              $scope.datos_tabla.push('<button class="btn btn-success btn-sm"><span class="fa fa-check"></span></button><button class="btn btn-sm btn-primary"><span class="fa fa-arrow-up"></span></button><button class="btn btn-danger btn-sm"><span class="fa fa-times"></span></button>');

 //          });


 //      });

 //         console.log($scope.datos_tabla);
 //   });


 

$(document).ready(function() {
    $('#tabla_prueba').DataTable( {
        // data: $scope.datos_tabla,
        columns: [
            { title: "Codigo" },
            { title: "Nombre" },
            { title: "Tipo" },
            { title: "Estado" },
            { title: "Emisor" },
            { title: "Maquina Emisora" },
            { title: "Impresion #" },
            { title: "Opciones" }
        ],
          dom: 'Bfrtip',
        buttons: [
              'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    } );
} );







  }

})();
