(function () {

  'use strict';

  angular
    .module('app')
    .controller('nuevoEquipo', nuevoEquipo);

  nuevoEquipo.$inject = ['$scope', '$rootScope', 'appService', '$window', '$http'];

function nuevoEquipo($scope, $rootScope, appService, $window, $http) {
$rootScope.hideSidebar = true;


  $(document).ready(function() {
    $('#reporte_tipo_documento').DataTable( {
        // data: $scope.datos_tabla,
        columns: [
            { title: "Codigo" },
            { title: "Nombre" },
            { title: "Fecha de envio" },
            { title: "Tipo de documento" },
            { title: "Estado" },
            { title: "Cola" },
            { title: "Usario Emisor" }
        ],
          dom: 'Bfrtip',
        buttons: [
              'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    } );
} );


}//CONTROLADOR

})();
