(function () {

  'use strict';

  angular
    .module('app')
    .controller('reporte_operadores', reporte_operadores);

  reporte_operadores.$inject = ['$scope', '$rootScope', 'appService', '$http'];

  function reporte_operadores($scope, $rootScope, appService, $http) {
     $rootScope.hideSidebar = true;
$scope.totalOperadoresPDF = function(){
    $scope.operadores = [];
    $http.get("http://localhost:3000/usuarios")
    	.then(function(response) {
           for (var i = 0; i < response.data.length; i++) {
	       	if (response.data[i].nivel == 2) {$scope.operadores.push(response.data[i]);}
	       }
	    
        var bodyData = [];
        bodyData.push(['CEDULA','NOMBRE','APELLIDO','CORREO','TELEFONO', 'PRESTAMOS ACTIVOS']);


        $scope.operadores.forEach(function(operador) {
       	
        var dataRow = [];
          dataRow.push(operador.cedula);
          dataRow.push(operador.nombre);
          dataRow.push(operador.apellido);
          dataRow.push(operador.correo);
          dataRow.push(operador.telefono);
          dataRow.push(operador.reportes.length);
          
          bodyData.push(dataRow)
        });
        

         var TotalOperadoresPDF = {
             content: [
             { text: 'TOTAL DE OPERADORES', fontSize: 20, alignment: 'center', lineHeight:4},
              {
              layout: 'lightHorizontalLines',
              table: {
                headerRows: 1,
                widths: ['auto', 'auto', 'auto','auto','auto', 'auto'],
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
         pdfMake.createPdf(TotalOperadoresPDF).download('Total_Operadores.pdf');
      });
      }


// OPERADORES SIN PRESTAMOS ACTIVOS

$scope.sinPrestamosActivos = function(){
    $scope.operadores = [];
    $http.get("http://localhost:3000/usuarios")
    	.then(function(response) {
           for (var i = 0; i < response.data.length; i++) {
	       	if (response.data[i].reportes.length == 0 && response.data[i].nivel == 2) {$scope.operadores.push(response.data[i]);}
	       }
	    
        var bodyData = [];
        bodyData.push(['CEDULA','NOMBRE','APELLIDO','CORREO','TELEFONO', 'PRESTAMOS ACTIVOS']);


        $scope.operadores.forEach(function(operador) {
       	
        var dataRow = [];
          dataRow.push(operador.cedula);
          dataRow.push(operador.nombre);
          dataRow.push(operador.apellido);
          dataRow.push(operador.correo);
          dataRow.push(operador.telefono);
          dataRow.push(operador.reportes.length);
          
          bodyData.push(dataRow)
        });
        

         var sinReportes = {
             content: [
             { text: 'OPERADORES SIN PRESTAMOS', fontSize: 20, alignment: 'center', lineHeight:4},
              {
              layout: 'lightHorizontalLines',
              table: {
                headerRows: 1,
                widths: ['auto', 'auto', 'auto','auto','auto', 'auto'],
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
         pdfMake.createPdf(sinReportes).download('Operadores_Sin_Prestamos.pdf');
      });
    }


// OPERADORES CON PRESTAMOS ACTIVOS

$scope.conPrestamosActivos = function(){
    $scope.operadores = [];
    $http.get("http://localhost:3000/usuarios")
    	.then(function(response) {
           for (var i = 0; i < response.data.length; i++) {
	       	if (response.data[i].reportes.length != 0 && response.data[i].nivel == 2) {$scope.operadores.push(response.data[i]);}
	       }
	    
        var bodyData = [];
        bodyData.push(['CEDULA','NOMBRE','APELLIDO','CORREO','TELEFONO', 'PRESTAMOS ACTIVOS']);


        $scope.operadores.forEach(function(operador) {
       	
        var dataRow = [];
          dataRow.push(operador.cedula);
          dataRow.push(operador.nombre);
          dataRow.push(operador.apellido);
          dataRow.push(operador.correo);
          dataRow.push(operador.telefono);
          dataRow.push(operador.reportes.length);
          
          bodyData.push(dataRow)
        });
        

         var conReportes = {
             content: [
             { text: 'OPERADORES CON PRESTAMOS ACTIVOS', fontSize: 20, alignment: 'center', lineHeight:4},
              {
              layout: 'lightHorizontalLines',
              table: {
                headerRows: 1,
                widths: ['auto', 'auto', 'auto','auto','auto', 'auto'],
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
         pdfMake.createPdf(conReportes).download('Operadores_Con_Prestamos.pdf');
      });
      }


  }






})();