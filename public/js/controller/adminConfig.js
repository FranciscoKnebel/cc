/* global angular, ngapp */

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
	$routeProvider.when('/admin/validar', {
		controller: 'adminController',
		templateUrl: '/template/adminValidar.html',
	});
});
