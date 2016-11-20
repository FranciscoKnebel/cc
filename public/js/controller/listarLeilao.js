/* global ngapp */

ngapp.controller('listarLeilaoController', function listarLeilaoController($scope, $http, $location) {
	$scope.leiloes = [];
	$scope.message = '';
	$scope.error = '';
	$scope.loading = {
		message: '',
		state: false,
	};
	$scope.propertyName = 'limitDate';
	$scope.reverse = false;

	function buscarTodosLeiloes() {
		const config = {
			method: 'GET',
			url: '/api/leilao/buscar',
			params: {
				listAll: true,
				state: 'currentAuctions',
			},
		};

		$scope.leiloes = [];
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

	$scope.refresh = function refresh() {
		buscarTodosLeiloes();
	};

	$scope.ordenar = function ordenar(propertyName) {
		$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
		$scope.propertyName = propertyName;
	};

	$scope.fireEvent = function fireEvent() {
		$('.ui.sticky').sticky({
			context: '#stickyContext',
			offset: 60,
		});
	};

	buscarTodosLeiloes();
});
