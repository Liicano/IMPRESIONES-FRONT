(function () {

  'use strict';

  angular
    .module('app')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', '$rootScope', 'appService'];

  function LoginCtrl($scope, $rootScope, appService) {
    console.log("LOGIN CONTROLLER");
  }

})();
