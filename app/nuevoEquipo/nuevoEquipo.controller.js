(function () {

  'use strict';

  angular
    .module('app')
    .controller('nuevoEquipo', nuevoEquipo);

  nuevoEquipo.$inject = ['$scope', '$rootScope', 'appService', '$window'];

function nuevoEquipo($scope, $rootScope, appService, $window) {
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






}//CONTROLADOR

})();
