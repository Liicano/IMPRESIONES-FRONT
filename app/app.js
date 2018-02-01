(function () {

  'use strict';

  angular
    .module('app', ['ui.router'])
    .controller('MainController', mainController)
    .config(config);

  mainController.$inject = ['$scope', '$rootScope', '$location', 'appService'];

  function mainController($scope, $rootScope, $location, appService) {
   console.log("MAIN CONTROLLER");
  }

  config.$inject = [
    '$stateProvider',
    '$locationProvider',
    '$urlRouterProvider'
  ];

  function config(
    $stateProvider,
    $locationProvider,
    $urlRouterProvider
  ) {

    $stateProvider
      .state('home', {
        url: '/home',
        controller: 'HomeController',
        templateUrl: 'app/home/home.html'
      })
      .state('login', {
        url: '/',
        controller: 'LoginCtrl',
        templateUrl: 'app/login/login.html',
      })
      .state('administrar_equipos', {
        url: '/administrar_equipos',
        controller: 'administrar_equipos',
        templateUrl: 'app/administrar_equipos/administrar_equipos.html'
      })
      .state('nuevo_encargado', {
        url: '/nuevo_encargado',
        controller: 'nuevo_encargado',
        templateUrl: 'app/nuevo_encargado/nuevo_encargado.html'
      })
      .state('buttons', {
        url: '/buttons',
        controller: 'ButtonsController',
        templateUrl: 'app/buttons/buttons.html'
      })
      .state('chartjs', {
        url: '/chartjs',
        controller: 'ChartjsController',
        templateUrl: 'app/chartjs/chartjs.html'
      })
      .state('administrar_encargado', {
        url: '/administrar_encargado',
        controller: 'administrar_encargado',
        templateUrl: 'app/administrar_encargado/administrar_encargado.html'
      })
      .state('administrar_operadores', {
        url: '/administrar_operadores',
        controller: 'administrar_operadores',
        templateUrl: 'app/administrar_operadores/administrar_operadores.html'
      })
      .state('nuevoEquipo', {
        url: '/nuevoEquipo',
        controller: 'nuevoEquipo',
        templateUrl: 'app/nuevoEquipo/nuevoEquipo.html'
      })
      .state('morris', {
        url: '/morris',
        controller: 'MorrisController',
        templateUrl: 'app/morris/morris.html'
      })
      .state('panels', {
        url: '/panels',
        controller: 'PanelsController',
        templateUrl: 'app/panels/panels.html'
      })
      .state('responsive_table', {
        url: '/responsive_table',
        controller: 'ResponsiveTableController',
        templateUrl: 'app/responsive_table/responsive_table.html'
      })
      .state('nuevoOperador', {
        url: '/nuevoOperador',
        controller: 'nuevoOperador',
        templateUrl: 'app/nuevoOperador/nuevoOperador.html'
      })
      .state('profile', {
        url: '/profile',
        controller: 'ProfileController',
        templateUrl: 'app/profile/profile.html'
      });

    // $urlRouterProvider.otherwise('/');

    $locationProvider.hashPrefix('');

    // Comment out the line below to run the app
    // without HTML5 mode (will use hashes in routes)
    $locationProvider.html5Mode(true);
  }

})();
