(function () {
'use strict';
 angular
    .module('app')
    .controller('nuevoOperador', nuevoOperador);

  nuevoOperador.$inject = ['$scope', '$rootScope', 'appService', '$http'];

  function nuevoOperador($scope, $rootScope, appService, $http) {
     $rootScope.hideSidebar = true;
    
//FUNCION QUE REGISTRA UN OPERADOR NUEVO EN BBDD
$scope.newOperador = function(nombre, apellido, password, cargo, cedula, avenida, calle, casa, correo, numero_telefono, punto_referencia){
  //VALORES POR DEFECTO  [ADMINISTRADOR = 0, ENCARGADO = 1, OPERADOR = 2]
  if (cedula == undefined) {toastr.error('La cedula debe tener como minimo 6 caracteres');}
  cargo = 'OPERADOR';
  var nivel = '2';

  var operador = {
     cedula: cedula,
     nombre: nombre,
     password: password,
     apellido: apellido,
     cargo: 'OPERADOR',
     avenida: avenida,
     calle: calle,
     casa: casa,
     correo: correo,
     telefono: numero_telefono,
     punto_referencia: 'USER',
     nivel: '2'
  }
 
   console.log("OPERADOR -> ",operador);
   //================================================
    if (nombre == undefined || password == undefined || apellido == undefined || cargo == undefined || cedula == undefined || avenida == undefined || calle == undefined || casa == undefined || correo == undefined || numero_telefono == undefined) {
      toastr.error('Tiene uno o mas campos vacios', '¡ERROR!');
    }else{

       $http.get("http://localhost:3000/usuario/"+cedula)
      .then(function(response) {
        if (response.data != null || response.data != undefined) {
          toastr.error('Usuario registrado con anterioridad',' ¡ERROR!');
        }else{

            $http.post("http://localhost:3000/usuarios", operador)
              .then(function(response) {
                toastr.success('Operador registrado con exito.','Felicidades');
            });

        }


      });

    



    }


}


  }

})();
