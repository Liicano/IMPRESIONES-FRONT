(function () {
'use strict';
 angular
    .module('app')
    .controller('nuevoOperador', nuevoOperador);

  nuevoOperador.$inject = ['$scope', '$rootScope', 'appService', '$http'];

  function nuevoOperador($scope, $rootScope, appService, $http) {
    
//FUNCION QUE REGISTRA UN OPERADOR NUEVO EN BBDD
$scope.newOperador = function(nombre, apellido, cargo, cedula, avenida, calle, casa, correo, numero_telefono, punto_referencia){
  //VALORES POR DEFECTO  [ADMINISTRADOR = 0, ENCARGADO = 1, OPERADOR = 2]
  cargo = 'OPERADOR';
  var nivel = '2';

  var operador = {
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
  console.log(operador);
   
   //================================================
    $http.post("http://localhost:3000/usuarios", operador)
     .then(function(response) {
         toastr.success('Operador registrado con exito.','Felicidades');
     });


}


  }

})();
