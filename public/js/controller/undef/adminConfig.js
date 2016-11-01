/* global ngapp */

ngapp.controller('undef', function leilaoController($scope, $http, $routeParams) {
	if ($routeParams.path) {
		window.location.assign('/' + $routeParams.path);
	} else {
		window.location.assign('/admin');
	}
});
