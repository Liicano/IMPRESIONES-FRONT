(function () {

  'use strict';

  angular
    .module('app')
    .controller('nuevo_encargado', nuevo_encargado);

  nuevo_encargado.$inject = ['$scope', '$rootScope', 'appService', '$http'];

  function nuevo_encargado($scope, $rootScope, appService, $http) {
  
  //FUNCION QUE REGISTRA UN OPERADOR NUEVO EN BBDD
$scope.newEncargado = function(nombre, apellido, cargo, cedula, avenida, calle, casa, correo, numero_telefono, punto_referencia){
  //VALORES POR DEFECTO  [ADMINISTRADOR = 0, ENCARGADO = 1, OPERADOR = 2]
  cargo = 'ENCARGADO';
  var nivel = '1';

  var encargado = {
     cedula: cedula,
     nombre: nombre,
     apellido: apellido,
     cargo: cargo,
     avenida: avenida,
     calle: calle,
     casa: casa,
     correo: correo,
     telefono: numero_telefono,
     punto_referencia: punto_referencia,
     nivel: nivel
  }
  console.log(encargado);
   
   //================================================
    $http.post("http://localhost:3000/usuarios", encargado)
     .then(function(response) {
         toastr.success('Encargado registrado con exito.','Felicidades');
     });


}




  }

})();
