/* global angular */

const ngapp = angular.module('cc', ['ngRoute']);

ngapp.controller('undef', function leilaoController($scope, $http, $routeParams) {
	if ($routeParams.path) {
		window.location.assign('/' + $routeParams.path);
	} else {
		window.location.assign('/admin');
	}
});

ngapp.config(function appConfig($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider.when('/admin', {
		controller: 'adminController',
		templateUrl: '/template/admin.html',
	});
	$routeProvider.when('/admin/criar', {
		controller: 'adminController',
		templateUrl: '/template/adminCriar.html',
	});
	$routeProvider.when('/:path', {
		controller: 'undef',
		templateUrl: '/template/undef.html',
	});
	$routeProvider.otherwise({
		controller: 'undef',
		templateUrl: '/template/undef.html',
	});
});
