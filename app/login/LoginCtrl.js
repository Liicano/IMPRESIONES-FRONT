(function () {

  'use strict';

  angular
    .module('app')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', '$rootScope', 'appService', '$http'];

  function LoginCtrl($scope, $rootScope, appService, $http, $cookies) {
   // LOGIN DE USUARIO
  	 $scope.login = function(cedula, password){
        appService.login(cedula, password);
        $rootScope.hideSidebar == true;
     }


     $scope.enviarEmail = function(email){
      console.log("email -> ",email);

        $http.get("http://localhost:3000/usuarioEmail/"+email)
          .then(function(response) {
            if (response.data == null || response.data == undefined) {
              toastr.error('¡USUARIO NO EXISTE!');
            }else{

               $http.post("http://localhost:3000/recover/"+email+"/"+response.data.password+"")
                .then(function(response) {
                  toastr.success('¡Correo enviado con exito!');
                });


            }
        });


     }



  }

})();
