/* global ngapp */

ngapp.controller('listarLeilaoController', function listarLeilaoController($scope, $http) {
	$scope.leiloes = [];

	function buscarTodosLeiloes() {
		const config = {
			method: 'GET',
			url: '/api/buscar/leilao',
			params: {
				listAll: true,
				state: 'andamento',
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
