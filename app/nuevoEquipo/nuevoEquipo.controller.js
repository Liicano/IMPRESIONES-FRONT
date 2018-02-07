(function () {

  'use strict';

  angular
    .module('app')
    .controller('nuevoEquipo', nuevoEquipo);

  nuevoEquipo.$inject = ['$scope', '$rootScope', 'appService', '$window', '$http'];

function nuevoEquipo($scope, $rootScope, appService, $window, $http) {
//FECHA PARA EL REGISTRO
$scope.Fecha_Hoy = new Date();

//FUNCION QUE COLOCA LOS INPUTS A VALORES POR DEFECTO
$scope.valoresDefecto = function(){
$scope.pais = 'VENEZUELA';   
$scope.estado = 'ZULIA';
$scope.avenida = 'PROLONGACION C2';
$scope.calle = '75A';
$scope.codigopostal = '4004';
$scope.puntoreferencia = 'A UN LADO DE LA PLAZA DE TOROS DE MARACAIBO.';
$scope.attr = 'disabled';
}

//FUNCION QUE REGISTRA UN EQUIPO EN BBDD
$scope.newEquipo = function(codigo, nombre, descripcion, serial_1, serial_2, modelo, fecha_compra, pais, estado, avenida, calle, codigo_postal, punto_referencia){
  
  var equipo = {
      codigo:codigo,
      nombre:nombre,
      descripcion:descripcion,
      serial_1:serial_1,
      serial_2:serial_2,
      modelo:modelo,
      fecha_compra: new Date(),
      ubicacion: {
          pais:pais,
          estado:estado,
          avenida:avenida,
          calle:calle,
          codigo_postal:codigo_postal,
          punto_referencia:punto_referencia
      }
  }
   
   //================================================
   $http.post("http://localhost:3000/equipos", equipo)
    .then(function(response) {
        toastr.success('Equipo registrado con exito.','Felicidades');
    });


}





}//CONTROLADOR

})();
