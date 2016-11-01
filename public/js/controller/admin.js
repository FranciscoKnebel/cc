/* global ngapp */

ngapp.controller('adminController', function adminController($scope, $http, $location, $routeParams, $filter) {
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

		$scope.message = '';
		$scope.err = '';

		$scope.loading = {
			message: 'Validando leilão...',
			state: true,
		};
		$http(config).then(function successCallback(response) {
			console.log('success', response);

			$scope.leiloes = $scope.leiloes.filter(function filterID(item) {
				return item._id !== id;
			});

			$scope.message = "Leilão " + id + " validado corretamente.";

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
