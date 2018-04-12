(function () {

  'use strict';

  angular
    .module('app', ['ui.router', 'ngCookies'])
    .controller('MainController', mainController)
    .config(config);

  mainController.$inject = ['$scope', '$rootScope', '$location', 'appService'];

  function mainController($scope, $rootScope, $location, appService) {

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
      .state('reporte_operadores', {
        url: '/reporte_operadores',
        controller: 'reporte_operadores',
        templateUrl: 'app/reporte_operadores/reporte_operadores.html'
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
      .state('reporte_equipos', {
        url: '/reporte_equipos',
        controller: 'reporte_equipos',
        templateUrl: 'app/reporte_equipos/reporte_equipos.html'
      })
      .state('editarSession', {
        url: '/editarSession',
        controller: 'editarSession',
        templateUrl: 'app/editarSession/editarSession.html'
      });

    // $urlRouterProvider.otherwise('/');

    $locationProvider.hashPrefix('');

    // Comment out the line below to run the app
    // without HTML5 mode (will use hashes in routes)
    $locationProvider.html5Mode(true);
  
}




})();
