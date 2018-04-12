'use strict';

angular.module('app')
    .factory('appService', function ($cookies, $cookieStore, $location, $http) {
        return {
            login: function(cedula, password){

              var data = {cedula:cedula, password:password};
              $http.post("http://localhost:3000/login", data)
                  .then(function(data) {
                    var LoggedScope = false;
                      if (!data.data.Check && data.data.usuario == null) toastr.error('Usuario no existe', '¡ERROR!');
                      if (!data.data.Check && data.data.usuario) toastr.error('Contraseña incorrecta', '¡ERROR!');
                      if (data.data.usuario.nivel == 2){toastr.error('Solo se les permite el acceso a los encargados', '¡ERROR!');}
                      else{

                      // EN CASO DE UN CORRECTO LOGIN [CHECK = TRUE]
                      if ( data.data.Check  && data.data.usuario != null){
                          $cookies.putObject('usuario',{
                            'cedula':data.data.usuario.cedula, 
                            'nombre':data.data.usuario.nombre, 
                            'apellido':data.data.usuario.apellido, 
                            'cargo':data.data.usuario.cargo, 
                            'nivel':data.data.usuario.nivel,
                            'correo':data.data.usuario.correo,
                            'telefono':data.data.usuario.telefono
                          });
                        
                          if (cedula !='' && password != ''){ 
                            $location.path("/home");

                      }else{
                        alert("USUARIO O CONTRASEÑA VACIOS");
                    }
                        } 
                    }

                    })

                  
            },
            checkStatus: function(){
                
                if ($cookies.getObject('usuario')) {
                return true;
                }else{
                    $location.path('/');
                    return false;
                }
               
            },
            logout: function(){
              $cookieStore.remove("usuario");
              $location.path("/");
            }



        }
    });
