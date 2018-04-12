(function () {

  'use strict';

  angular
    .module('app')
    .controller('reporte_equipos', reporte_equipos);

  reporte_equipos.$inject = ['$scope', '$rootScope', 'appService', '$http'];

  function reporte_equipos($scope, $rootScope, appService, $http) {
     $rootScope.hideSidebar = true;
     
  	$scope.totalEquiposPDF = function(){

    $scope.equipos = [];
    $http.get("http://localhost:3000/equipos")
    	.then(function(response) {
    	angular.copy(response.data, $scope.equipos);
        var bodyData = [];
        bodyData.push(['CODIGO','NOMBRE','MODELO','DESCRIPCION','PRESTAMO', 'SERIAL # 1', 'SERIAL # 2']);


        $scope.equipos.forEach(function(equipo) {
       	
        var dataRow = [];
          dataRow.push(equipo.codigo);
          dataRow.push(equipo.nombre);
          dataRow.push(equipo.modelo);
          dataRow.push(equipo.descripcion);
          dataRow.push(equipo.prestamo);
          dataRow.push(equipo.serial_1);
          dataRow.push(equipo.serial_2);
          
          bodyData.push(dataRow)
        });
        

         var totalEquiposPDF = {
             content: [
             { text: 'TOTAL DE EQUIPOS', fontSize: 20, alignment: 'center', lineHeight:4},
              {
              layout: 'lightHorizontalLines',
              table: {
                headerRows: 1,
                widths: ['auto', 'auto', 'auto','auto','auto', 'auto', 'auto'],
                body: bodyData
              }
            }

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
		  }
          };
         pdfMake.createPdf(totalEquiposPDF).download('TOTAL_EQUIPOS.pdf');
      });
      }

// EQUIPOS EN EL INVENTARIO



  	$scope.enInventario = function(){

    $scope.equipos = [];
    $http.get("http://localhost:3000/equipos")
    .then(function(response) {

    	 for (var i = 0; i < response.data.length; i++) {
	       	if (response.data[i].ubicacion[0].estado == 'INVENTARIO') {$scope.equipos.push(response.data[i]);}
	       }


    	
        var bodyData = [];
        bodyData.push(['CODIGO','NOMBRE','MODELO','DESCRIPCION','PRESTAMO', 'SERIAL # 1', 'SERIAL # 2']);


        $scope.equipos.forEach(function(equipo) {
       	
        var dataRow = [];
          dataRow.push(equipo.codigo);
          dataRow.push(equipo.nombre);
          dataRow.push(equipo.modelo);
          dataRow.push(equipo.descripcion);
          dataRow.push(equipo.prestamo);
          dataRow.push(equipo.serial_1);
          dataRow.push(equipo.serial_2);
          
          bodyData.push(dataRow)
        });
        

         var enInventarioPDF = {
             content: [
             { text: 'EQUIPOS EN EL INVENTARIO', fontSize: 20, alignment: 'center', lineHeight:4},
              {
              layout: 'lightHorizontalLines',
              table: {
                headerRows: 1,
                widths: ['auto', 'auto', 'auto','auto','auto', 'auto', 'auto'],
                body: bodyData
              }
            }

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
		  }
          };
         pdfMake.createPdf(enInventarioPDF).download('EQUIPOS_INVENTARIO.pdf');
      });
      }

// EQUIPOS EN ESTADO DE PRESTAMO
    $scope.enPrestamo = function(){

    $scope.equipos = [];
    $http.get("http://localhost:3000/equipos")
    .then(function(response) {

       for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].prestamo == 'SI') {$scope.equipos.push(response.data[i]);}
         }


      
        var bodyData = [];
        bodyData.push(['CODIGO','NOMBRE','MODELO','DESCRIPCION','PRESTAMO', 'SERIAL # 1', 'SERIAL # 2']);


        $scope.equipos.forEach(function(equipo) {
        
        var dataRow = [];
          dataRow.push(equipo.codigo);
          dataRow.push(equipo.nombre);
          dataRow.push(equipo.modelo);
          dataRow.push(equipo.descripcion);
          dataRow.push(equipo.prestamo);
          dataRow.push(equipo.serial_1);
          dataRow.push(equipo.serial_2);
          
          bodyData.push(dataRow)
        });
        

         var enPrestamoPDF = {
             content: [
             { text: 'EQUIPOS EN ESTADO DE PRESTAMO', fontSize: 20, alignment: 'center', lineHeight:4},
              {
              layout: 'lightHorizontalLines',
              table: {
                headerRows: 1,
                widths: ['auto', 'auto', 'auto','auto','auto', 'auto', 'auto'],
                body: bodyData
              }
            }

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
      }
          };
         pdfMake.createPdf(enPrestamoPDF).download('EQUIPOS_EN_PRESTAMO.pdf');
      });
      }

// EQUIPOS DISPONIBLES [STATUS]
    $scope.equiposDisponibles = function(){

    $scope.equipos = [];
    $http.get("http://localhost:3000/equipos")
    .then(function(response) {  

       for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].estado_equipo == 'DISPONIBLE') {$scope.equipos.push(response.data[i]);}
         }


      
        var bodyData = [];
        bodyData.push(['CODIGO','NOMBRE','MODELO','DESCRIPCION','PRESTAMO', 'SERIAL # 1', 'SERIAL # 2']);


        $scope.equipos.forEach(function(equipo) {
        
        var dataRow = [];
          dataRow.push(equipo.codigo);
          dataRow.push(equipo.nombre);
          dataRow.push(equipo.modelo);
          dataRow.push(equipo.descripcion);
          dataRow.push(equipo.prestamo);
          dataRow.push(equipo.serial_1);
          dataRow.push(equipo.serial_2);
          
          bodyData.push(dataRow)
        });
        

         var equiposDisponiblesPDF = {
             content: [
             { text: 'EQUIPOS DISPONIBLES', fontSize: 20, alignment: 'center', lineHeight:4},
              {
              layout: 'lightHorizontalLines',
              table: {
                headerRows: 1,
                widths: ['auto', 'auto', 'auto','auto','auto', 'auto', 'auto'],
                body: bodyData
              }
            }

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
      }
          };
         pdfMake.createPdf(equiposDisponiblesPDF).download('EQUIPOS_DISPONIBLES.pdf');
      });
      }

// EQUIPOS EN MANTENIMIENTO
$scope.equiposMantenimiento = function(){

    $scope.equipos = [];
    $http.get("http://localhost:3000/equipos")
    .then(function(response) {

       for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].estado_equipo == 'MANTENIMIENTO') {$scope.equipos.push(response.data[i]);}
         }


      
        var bodyData = [];
        bodyData.push(['CODIGO','NOMBRE','MODELO','DESCRIPCION','PRESTAMO', 'SERIAL # 1', 'SERIAL # 2']);


        $scope.equipos.forEach(function(equipo) {
        
        var dataRow = [];
          dataRow.push(equipo.codigo);
          dataRow.push(equipo.nombre);
          dataRow.push(equipo.modelo);
          dataRow.push(equipo.descripcion);
          dataRow.push(equipo.prestamo);
          dataRow.push(equipo.serial_1);
          dataRow.push(equipo.serial_2);
          
          bodyData.push(dataRow)
        });
        

         var equiposMantenimientoPDF = {
             content: [
             { text: 'EQUIPOS EN MANTENIMIENTO', fontSize: 20, alignment: 'center', lineHeight:4},
              {
              layout: 'lightHorizontalLines',
              table: {
                headerRows: 1,
                widths: ['auto', 'auto', 'auto','auto','auto', 'auto', 'auto'],
                body: bodyData
              }
            }

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
      }
          };
         pdfMake.createPdf(equiposMantenimientoPDF).download('EQUIPOS_MANTENIMIENTO.pdf');
      });
      }


// EQUIPOS FUERA DE SERVICIO
$scope.equiposFueraServicio = function(){

    $scope.equipos = [];
    $http.get("http://localhost:3000/equipos")
    .then(function(response) {

       for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].estado_equipo == 'FUERA DE SERVICIO') {$scope.equipos.push(response.data[i]);}
         }


      
        var bodyData = [];
        bodyData.push(['CODIGO','NOMBRE','MODELO','DESCRIPCION','PRESTAMO', 'SERIAL # 1', 'SERIAL # 2']);


        $scope.equipos.forEach(function(equipo) {
        
        var dataRow = [];
          dataRow.push(equipo.codigo);
          dataRow.push(equipo.nombre);
          dataRow.push(equipo.modelo);
          dataRow.push(equipo.descripcion);
          dataRow.push(equipo.prestamo);
          dataRow.push(equipo.serial_1);
          dataRow.push(equipo.serial_2);
          
          bodyData.push(dataRow)
        });
        

         var equiposFueraServicioPDF = {
             content: [
             { text: 'EQUIPOS FUERA DE SERVICIO', fontSize: 20, alignment: 'center', lineHeight:4},
              {
              layout: 'lightHorizontalLines',
              table: {
                headerRows: 1,
                widths: ['auto', 'auto', 'auto','auto','auto', 'auto', 'auto'],
                body: bodyData
              }
            }

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
      }
          };
         pdfMake.createPdf(equiposFueraServicioPDF).download('EQUIPOS_FUERA_DE_SERVICIO.pdf');
      });
      }





  }

})();