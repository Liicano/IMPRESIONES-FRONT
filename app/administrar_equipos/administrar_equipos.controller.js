(function () {

  'use strict';

  angular
    .module('app')
    .controller('administrar_equipos', administrar_equipos);

  administrar_equipos.$inject = ['$scope', '$rootScope', 'appService', '$http', '$location'];

  function administrar_equipos($scope, $rootScope, appService, $http, $location) {
    $rootScope.hideSidebar = true;

     $(document).ready(function() {
    $('#reporte_nombre_documento').DataTable( {
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




}//Controller

})();
