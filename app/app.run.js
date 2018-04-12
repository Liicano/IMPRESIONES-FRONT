(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  run.$inject = ['appService', '$rootScope', '$cookies','$cookieStore', '$location', '$state'];
    
  function run(appService, $scope ,$rootScope, $cookies, $cookieStore, $location, $state) {
  	  if (window.location.pathname == '/') {$rootScope.hideSidebar = false;}else{$rootScope.hideSidebar = true;}
  	 	console.log("window.location.pathname -> ",window.location.pathname);
      console.log("$rootScope.hideSidebar -> ",$rootScope.hideSidebar);
  }

})();