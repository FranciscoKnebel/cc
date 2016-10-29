/* global angular */

const ngapp = angular.module('cc', ['ngRoute']);

ngapp.controller('undef', function leilaoController($scope, $http, $routeParams) {
	console.log('Undefined path.');
});

ngapp.config(function appConfig($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider.when('/leilao/listar', {
		controller: 'listarLeilaoController',
		templateUrl: '/template/listarLeilao.html',
	})
	$routeProvider.when('/leilao/:id', {
		controller: 'leilaoController',
		templateUrl: '/template/leilao.html'
	});
	$routeProvider.otherwise({
		controller: 'undef',
		templateUrl: '/template/undef.html',
	});
});
