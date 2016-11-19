/* global angular, ngapp */

ngapp.config(function appConfig($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider.when('/app', {
		redirectTo: '/admin',
	});
	$routeProvider.when('/admin', {
		controller: 'adminController',
		templateUrl: '/template/admin.html',
	});
	$routeProvider.when('/admin/criar', {
		controller: 'adminController',
		templateUrl: '/template/adminCriar.html',
	});
	$routeProvider.when('/admin/validar', {
		controller: 'adminController',
		templateUrl: '/template/adminValidar.html',
	});
	$routeProvider.when('/admin/editar', {
		controller: 'listarLeilaoController',
		templateUrl: '/template/adminEditar.html',
	});
});
