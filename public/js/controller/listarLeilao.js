/* global ngapp */

ngapp.controller('listarLeilaoController', function listarLeilaoController($scope, $http) {
	$scope.leiloes = [];
	$scope.message = '';
	$scope.error = '';
	$scope.loading = {
		message: '',
		state: false,
	};

	function buscarTodosLeiloes() {
		const config = {
			method: 'GET',
			url: '/api/leilao/buscar',
			params: {
				listAll: true,
				state: 'valido',
			},
		};

		$scope.loading = {
			message: 'Carregando leilões...',
			state: true,
		};
		$http(config).then(function successCallback(response) {
			if (response.data.length > 0) {
				$scope.leiloes = response.data;
			} else {
				$scope.leiloes = [];
				$scope.message = 'Não há leilões em andamento no sistema.';
			}

			$scope.loading = {
				state: false,
			};
		}, function errorCallback(response) {
			console.log('failure', response);
			$scope.error = response.statusText;
			$scope.loading = {
				state: false,
			};
		});
	}

	buscarTodosLeiloes();
});
