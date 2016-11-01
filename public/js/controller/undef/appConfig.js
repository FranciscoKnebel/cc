/* global ngapp */

ngapp.controller('undef', function leilaoController($scope, $http, $routeParams) {
	window.location.assign('/' + $routeParams.path);
});
