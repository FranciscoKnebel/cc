/* global ngapp */

ngapp.controller('listarLeilaoController', function listarLeilaoController($scope, $http) {
	$scope.leiloes = [];

	function buscarTodosLeiloes() {
		const config = {
			method: 'GET',
			url: '/api/leilao/buscar',
			params: {
				listAll: true,
				state: 'valido',
			},
		};

		$http(config).then(function successCallback(response) {
			$scope.leiloes = response.data;
		}, function errorCallback(response) {
			console.error(response);
		});
	}

	buscarTodosLeiloes();
});
