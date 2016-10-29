/* global angular */

const ngapp = angular.module('cc', ['ngRoute']);

ngapp.config(function appConfig($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider.when('/', {
		controller: 'listarLeilaoController',
		templateUrl: '/template/listarLeilao.html',
	});
	$routeProvider.when('/leilao/listar', {
		controller: 'listarLeilaoController',
		templateUrl: '/template/listarLeilao.html',
	});
	$routeProvider.otherwise({
		redirectTo: '/',
	});
});
