(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', homeController);

  homeController.$inject = ['$scope', '$rootScope', 'appService', '$http', '$cookies', '$location'];

  function homeController($scope, $rootScope, appService, $http, $cookies, $location) {
    
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


     $scope.equiposReporte = [];
      $scope.findEquipo = function(equipo){
        //HTTP PARA LLAMAR DATA DEL EQUIPO

        $http.get("http://localhost:3000/equipo/"+equipo).then(function(response) {
            if (response.data == null) {
              toastr.warning('Codigo de equipo no registrado en el sistema','Error');
            }else{
            $scope.equipoData = [];
            angular.copy(response.data,$scope.equipoData);
          }
        });
      }

      $scope.addEquipo = function(equipo){
        if ($scope.operadorData == undefined || $scope.operadorData == null) {
          toastr.warning('Indique un operador','¡Error!');
        }else{
         if (equipo == null || equipo == undefined) {
          toastr.warning('No pude agregar un equipo vacio','¡ERROR!');
         }else{
          $http.get("http://localhost:3000/equipo/"+equipo).then(function(response) {
            //ALMACENANDO DENTRO DE ARRAY TODOS LOS EQUIPOS QUE SE BUSCAN
            $scope.equiposReporte.push(response.data);
            console.log("EQUIPOS REPORTE -> ",$scope.equiposReporte);
            
        });
         }
      }
      }

      // LLAMAR DATA DEL OPERADOR
      $scope.addOperador = function(cedula){
         $http.get("http://localhost:3000/usuario/"+cedula).then(function(response) {
           if (response.data == null) {
            toastr.warning('Operador no registrado','Error');
          }else{
            $scope.operadorData = [];
            angular.copy(response.data,$scope.operadorData);
            }
        });
      
      }

      // FUNCION QUE LIMPIA LOS INPUTS;
      function cleanData() {
        $scope.codigo = '';
        $scope.operador.cedula = '';
        $scope.operadorData = '';
        $scope.equiposReporte = '';
        $scope.equipoData = '';
      }

    $scope.ModalPassData = function(equipos, operador){
      $scope.registrarOperacion = function(equipos, operador, newDireccion){  
        console.log("EQUIPOSSSSSS -> ",equipos.length);
        if (equipos.length == 0) {
          toastr.error('Debe ingresar al menos un equipo para generar la operacion.', '¡ERROR!');
        }else{  

        if ($scope.operadorData == undefined || $scope.operadorData == null) {
             toastr.warning('Indique un operador','¡Error!');
        if (equipos == null || equipos == '') {
          toastr.warning('No hay equipos registrados para esta operacion.','¡Error!');
        }
        }else{
        var Fecha_Salida = Date();
        // HACIENDO PUSH DE LOS EQUIPOS Y REPORTES
          var newOperator = {
            apellido: operador.apellido,
            cargo: operador.cargo,
            cedula: operador.cedula,
            correo: operador.correo,
            nivel: operador.nivel,
            nombre: operador.nombre,
            reportes: [],
            telefono: operador.telefono
          }


         for (var i = 0; i < equipos.length; i++) {

          var equipoEdit = {
            codigo: equipos[i].codigo,
            descripcion: equipos[i].descripcion,
            estado_equipo: equipos[i].estado_equipo,
            fecha_compra: equipos[i].fecha_compra,
            fecha_salida: equipos[i].fecha_salida,
            modelo: equipos[i].modelo,
            nombre: equipos[i].nombre,
            prestamo: 'SI',
            serial_1: equipos[i].serial_1,
            serial_2: equipos[i].serial_2,
            ubicacion: {
              pais:             equipos[i].ubicacion[0].pais,
              estado:           newDireccion.estadoSacar,
              avenida:          newDireccion.avenidaSacar,
              calle:            newDireccion.calleSacar,
              codigo_postal:    equipos[i].ubicacion[0]. codigo_postal,
              punto_referencia: newDireccion.punto_referenciaSacar
            }
          }


          // PUT PARA MODIFICAR STATUS DE PRESTAMO DEL EQUIPO
           $http.put("http://localhost:3000/equipo/"+equipos[i].codigo, equipoEdit)
          .then(function(response) {  
            console.log("Editado con exito el equipo -> ",response.data);
          });


           var newReporte = {
             codigo: equipos[i].codigo,
             nombre: equipos[i].nombre,
             modelo: equipos[i].modelo,
             fecha_salida: Fecha_Salida,
             fecha_entrada: ''
           }
            newOperator.reportes.push(newReporte);
         }
         // PUT PARA AGREGAR DATA A REPORTES DEL OPERADOR
         $http.put("http://localhost:3000/usuario/"+newOperator.cedula, newOperator)
          .then(function(response) {  
            cleanData();
            toastr.success('¡Operacion registrada con exito!');
          });
            
  // GENERANDO REPORTES

var bodyData = [];
        bodyData.push(['CODIGO','NOMBRE','MODELO','DESCRIPCION', 'SERIAL # 1', 'SERIAL # 2']);


        equipos.forEach(function(equipo) {
        var dataRow = [];
          dataRow.push(equipo.codigo);
          dataRow.push(equipo.nombre);
          dataRow.push(equipo.modelo);
          dataRow.push(equipo.descripcion);
          dataRow.push(equipo.serial_1);
          dataRow.push(equipo.serial_2);
          
          bodyData.push(dataRow)
        });
        

         var constanciaOperacion = {
             content: [
             { text: 'CONSTANCIA DE PRESTAMO', fontSize: 13, alignment: 'center', lineHeight:3},
             { text: ''+operador.nombre+' '+operador.apellido+'  CI: ['+operador.cedula+']', fontSize: 12, alignment: 'center', lineHeight:3},
             { text: 'Constancia de compromiso que debe ser firmada y autorizada por el encargado para que el prestamo del equipo audiovisual se realice de manera exitosa', fontSize: 9, alignment: 'center', lineHeight:4},
             { text: '¡EQUIPOS QUE FORMAN PARTE DEL PRESTAMO!', fontSize: 13, alignment: 'center', lineHeight:3},
             
              {
              alignment: 'center',
              layout: 'lightHorizontalLines',
              table: {
                headerRows: 1,
                widths: ['auto', 'auto', 'auto','auto','auto', 'auto'],
                body: bodyData
              },
              lineHeight:3
            },
            { text: '¡DIRECCION DE ENVIO!', fontSize: 13, alignment: 'center', lineHeight:2},
            { text: 'ESTADO: ['+newDireccion.estadoSacar+']  AVENIDA: ['+newDireccion.avenidaSacar+'] CALLE: ['+newDireccion.calleSacar+'] PUNTO DE REFERENCIA: ['+newDireccion.punto_referenciaSacar+'] ', fontSize: 10, alignment: 'center'},
          ],
          styles: {
        header: {
          fontSize: 22,
          bold: true
        },
        anotherStyle: {
          italics: true,
          alignment: 'right'
        }
      },
      footer: function(page, pages) { 
        return { 
            columns: [ 
            { text: '_________________________                    _________________________', fontSize: 9, alignment: 'center'},
            { text: '      ENCARGADO                                       OPERADOR', fontSize: 9, alignment: 'center', lineHeight:2},
            ],
           
        };
    }
          };
         pdfMake.createPdf(constanciaOperacion).download('CONSTANCIA.pdf');






  // ---------------------------


            }
          }
      }
}



// DEVOLVER EQUIPO LUEGO DE SACARLO COMO PRESTAMO
$scope.devolverEquipo = function(codigo, operadorData){
 if ($scope.operadorData == undefined || $scope.operadorData == null) {
          toastr.warning('Indique un operador','¡Error!');
  }else{
    
 $http.get("http://localhost:3000/equipo/"+codigo).then(function(equipoDevolver) {
      
      // MODIFICANDO REPORTE DEL USUARIO
      var fecha_entrada = Date();
      var newReporte = [];
        operadorData.reportes.forEach(function(reporte) {
        reporte.fecha_entrada = fecha_entrada;
        newReporte.push(reporte);
      });
      
var OperadorReport = {
  apellido: operadorData.apellido,
  cargo: operadorData.cargo,
  cedula: operadorData.cedula,
  correo: operadorData.correo,
  nivel: operadorData.nivel,
  nombre: operadorData.nombre,
  telefono: operadorData.telefono,
  reportes: []
}
angular.copy(newReporte, OperadorReport.reportes);

//MODIFICANDO EQUIPOS 
 var Equipo = {
    codigo: equipoDevolver.data.codigo,
    descripcion: equipoDevolver.data.descripcion,
    estado_equipo: equipoDevolver.data.estado_equipo,
    fecha_compra: equipoDevolver.data.fecha_compra,
    fecha_salida: equipoDevolver.data.fecha_salida,
    modelo: equipoDevolver.data.modelo,
    nombre: equipoDevolver.data.nombre,
    prestamo: 'NO',
    serial_1: equipoDevolver.data.serial_1,
    serial_2: equipoDevolver.data.serial_2,
    ubicacion: {
      pais:             equipoDevolver.data.ubicacion[0].pais,
      estado:           'INVENTARIO',
      avenida:          '',
      calle:            '', 
      codigo_postal:    equipoDevolver.data.ubicacion[0]. codigo_postal,
      punto_referencia: 'INVENTARIO'
    }
  }

 $http.put("http://localhost:3000/equipo/"+Equipo.codigo, Equipo).then(function(response) {  
  if (response.status == 200) {
     $http.put("http://localhost:3000/usuario/"+OperadorReport.cedula, OperadorReport)
     .then(function(response) {  
       console.log("Response del put de devolver equipo -> ",response.data);
         $scope.codigoDevolver = '';
         toastr.success('¡Equipo devuelto con exito!');
   });
  }else{
    toastr.warning('Problemas al modificar','¡Error!');
  }
  });

// GENERANDO REPORTES

        var bodyData = [];
        bodyData.push(['CODIGO','NOMBRE','MODELO','DESCRIPCION', 'SERIAL # 1', 'SERIAL # 2']);

          var EquipoReturn = [];
          angular.copy(equipoDevolver.data, EquipoReturn);
          var dataRow = [];
          dataRow.push(EquipoReturn.codigo);
          dataRow.push(EquipoReturn.nombre);
          dataRow.push(EquipoReturn.modelo);
          dataRow.push(EquipoReturn.descripcion);
          dataRow.push(EquipoReturn.serial_1);
          dataRow.push(EquipoReturn.serial_2);
          bodyData.push(dataRow)
        
         var constanciaOperacion = {
             content: [
             { text: 'CONSTANCIA DE DEVOLUCION DE EQUIPO', fontSize: 13, alignment: 'center', lineHeight:3},
             { text: ''+operadorData.nombre+' '+operadorData.apellido+'  CI: ['+operadorData.cedula+']', fontSize: 12, alignment: 'center', lineHeight:3},
             { text: 'Este documento firmado hace constar que el equipo fue devuelto correctamente y en buenas condiciones.', fontSize: 9, alignment: 'center', lineHeight:4},
             { text: '¡DATOS DE EL EQUIPO', fontSize: 13, alignment: 'center', lineHeight:3},
             
              {
              alignment: 'center',
              layout: 'lightHorizontalLines',
              table: {
                headerRows: 1,
                widths: ['auto', 'auto', 'auto','auto','auto', 'auto'],
                body: bodyData
              },
              lineHeight:3
            },
          ],
      footer: function(page, pages) { 
        return { 
            columns: [ 
            { text: '_________________________                    _________________________', fontSize: 9, alignment: 'center'},
            { text: '      ENCARGADO                                       OPERADOR', fontSize: 9, alignment: 'center', lineHeight:2},
            ],
           
        };
    }
          };
         pdfMake.createPdf(constanciaOperacion).download('CONSTANCIA.pdf');
  // ---------------------------




 })



}

 
}


  }

})();
