(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', homeController);

  homeController.$inject = ['$scope', '$rootScope', 'appService', '$http'];

  function homeController($scope, $rootScope, appService, $http) {
    $scope.equiposReporte = [];


   // if (operadorData == undefined) {
   //    toastr.danger('Ingrese un operador valido','Error');
   // }


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
         $http.get("http://localhost:3000/equipo/"+equipo).then(function(response) {
            //ALMACENANDO DENTRO DE ARRAY TODOS LOS EQUIPOS QUE SE BUSCAN
            $scope.equiposReporte.push(response.data);
            console.log("EQUIPOS REPORTE -> ",$scope.equiposReporte);
            
        });
      
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

      $scope.registrarOperacion = function(equipos, operador){  
        // ME ESTA DANDO ERROR EN EL PUSH (¡PENDIENTE POR RESOLVER!)
         console.log("equipos -> ",equipos);
         console.log("operador -> ",operador);
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
              estado:           equipos[i].ubicacion[0].estado,
              avenida:          equipos[i].ubicacion[0].avenida,
              calle:            equipos[i].ubicacion[0].calle,
              codigo_postal:    equipos[i].ubicacion[0]. codigo_postal,
              punto_referencia: equipos[i].ubicacion[0].punto_referencia
            }
          }


          // PUT PARA MODIFICAR STATUS DE PRESTAMO DEL EQUIPO
           $http.put("http://localhost:3000/equipo/"+equipos[i].codigo, equipoEdit)
          .then(function(response) {  
            console.log("EQUIPO "+equipos[i]+" EDITADO CON EXITO!");
          });


           var newReporte = {
             codigo: equipos[i].codigo,
             nombre: equipos[i].nombre,
             modelo: equipos[i].modelo,
             fecha_salida: Fecha_Salida,
             fecha_entrada: null
           }
            newOperator.reportes.push(newReporte);
         }
         // PUT PARA AGREGAR DATA A REPORTES DEL OPERADOR
         $http.put("http://localhost:3000/usuario/"+newOperator.cedula, newOperator)
          .then(function(response) {  
            console.log(response.data);
            cleanData();
            toastr.success('¡Operacion registrada con exito!');
          });

      }


      $scope.generatePdf = function(){

        titulo = 'Equipos Disponibles';

        var bodyData = [];
        bodyData.push(['Codigo','Nombre','Modelo','Proveedor','Ubicacion']);

        Disponibles.forEach(function(sourceRow) {
        var dataRow = [];
          dataRow.push(sourceRow.codigo);
          dataRow.push(sourceRow.nombre);
          dataRow.push(sourceRow.modelo);
          dataRow.push(sourceRow.proveedor);
          dataRow.push(sourceRow.ubicacion);
          
        bodyData.push(dataRow)
        });
         var DisponiblesPdf = {
             content: [
             //''+titulo+'',
              {
              layout: 'lightHorizontalLines',
              table: {
                headerRows: 1,
                widths: ['*', '*', '*','*','*'],
                body: bodyData
              }
            }

          ]
          };

      }


// DEVOLVER EQUIPO LUEGO DE SACARLO COMO PRESTAMO
$scope.devolverEquipo = function(codigo, operadorData){

 $http.get("http://localhost:3000/equipo/"+codigo).then(function(equipoDevolver) {
  console.log("OPERADOR DENTRO DE DEVOLVER -> ",operadorData);

 // Insertando fecha de devolucion de equipo
 var Fecha_Retorno = Date();

         for (var i = 0; i < operadorData.reportes.length; i++) {
             var newReporte = {
             codigo: operadorData.reportes[i].codigo,
             nombre: operadorData.reportes[i].nombre,
             modelo: operadorData.reportes[i].modelo,
             fecha_salida: operadorData.reportes[i].fecha_salida,
             fecha_entrada: Fecha_Retorno
           }
          angular.copy(newReporte, operadorData.reportes[i]); 
        }

        
        $http.put("http://localhost:3000/usuario/"+operadorData.cedula, operadorData).then(function(response) {
          console.log("Operador despues del put -> ",response.data);
        });

//========================================== 

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
      estado:           equipoDevolver.data.ubicacion[0].estado,
      avenida:          equipoDevolver.data.ubicacion[0].avenida,
      calle:            equipoDevolver.data.ubicacion[0].calle,
      codigo_postal:    equipoDevolver.data.ubicacion[0]. codigo_postal,
      punto_referencia: equipoDevolver.data.ubicacion[0].punto_referencia
    }
  }

 $http.put("http://localhost:3000/equipo/"+Equipo.codigo, Equipo)
          .then(function(response) {  
            console.log("EQUIPO "+Equipo+" EDITADO CON EXITO!");
            $scope.codigoDevolver = '';
             toastr.success('¡Equipo devuelto con exito!');
  });

 })




}


  }

})();
