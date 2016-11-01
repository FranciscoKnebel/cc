/* global ngapp */

ngapp.controller('adminController', function adminController($scope, $http, $location, $routeParams) {
	$scope.message = '';
	$scope.error = '';
	$scope.loading = {
		message: '',
		state: false,
	};

	$scope.validarLeilao = function validarLeilao(id) {
		const config = {
			method: 'POST',
			url: '/api/leilao/alterar',
			data: {
				id,
				state: 'valido',
			},
		};

		$scope.loading = {
			message: 'Validando leilão...',
			state: true,
		};
		$http(config).then(function successCallback(response) {
			console.log(response);
		}, function failureCallback(response) {
			console.log('error', response);
		});
	};

	$scope.editarLeilao = function editarLeilao(id) {
		console.log(id);
		return;
	};

	function carregarLeiloesPendentes() {
		const config = {
			method: 'GET',
			url: '/api/leilao/buscar',
			params: {
				listAll: 'true',
				state: 'pendente',
			},
		};

		$scope.loading = {
			message: 'Carregando leilões...',
			state: true,
		};
		$http(config).then(function successCallback(response) {
			const leiloes = response.data;

			if (leiloes.length > 0) {
				$scope.leiloes = leiloes;
			} else {
				$scope.leiloes = [];
				$scope.message = 'Não há leilões pendentes no sistema.';
			}

			$scope.loading = {
				state: false,
			};
		}, function failureCallback(response) {
			console.log('failure', response);
			$scope.error = response.statusText;
			$scope.loading = {
				state: false,
			};
		});
	}

	function pageRouter(path) {
		switch (path) {
		case '/admin/validar':
			carregarLeiloesPendentes();

			break;
		default:
			break;
		}
	}

	pageRouter($location.path());
});
