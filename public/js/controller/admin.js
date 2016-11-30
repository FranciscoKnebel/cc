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
				state: 'currentAuctions',
			},
		};

		$scope.message = '';
		$scope.err = '';

		$scope.loading = {
			message: 'Validando leilão...',
			state: true,
		};
		$http(config).then(function successCallback(response) {
			$scope.leiloes = $scope.leiloes.filter(function filterID(item) {
				return item._id !== id;
			});

			alert(`Leilão ${id} validado corretamente.`);

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

	function carregarTodosLeiloes(type, callbackSuccess, callbackError) {
		const config = {
			method: 'GET',
			url: '/api/leilao/buscar',
			params: {
				listAll: true,
				state: type,
			},
		};

		$scope.leiloes = [];
		$http(config).then(function successCallback(response) {
			callbackSuccess(response);
		}, function errorCallback(response) {
			callbackError(response);
		});
	}

	function carregarLeiloes(type) {
		$scope.leiloes = [];
		$scope.message = '';
		$scope.loading = {
			message: 'Carregando leilões...',
			state: true,
		};

		carregarTodosLeiloes(type, (response) => {
			if (response.data.length > 0) {
				$scope.leiloes = response.data;
				$scope.message = type;
			} else {
				$scope.leiloes = [];
				$scope.message = `Não há leilões desse tipo ("${type}") no sistema.`;
			}

			$scope.loading = {
				state: false,
			};
		}, (response) => {
			$scope.error = response.statusText;
			$scope.loading = {
				state: false,
			};
		});
	}

	function pageRouter(path) {
		switch (path) {
		case '/admin/validar':
			carregarLeiloes('validationPendingAuctions');
			break;
		default:
			break;
		}
	}

	$scope.propertyName = 'limitDate';
	$scope.reverse = false;

	$scope.refresh = function refresh(type) {
		switch (type) {
		case 'validationPendingAuctions':
			carregarLeiloes('validationPendingAuctions');
			break;
		case 'currentAuctions':
			carregarLeiloes('currentAuctions');
			break;
		case undefined:
			break;
		default:
			carregarLeiloes(type);
		}
	};

	$scope.ordenar = function ordenar(propertyName) {
		$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
		$scope.propertyName = propertyName;
	};

	$scope.carregarTodosLeiloes = function loadAll(type) {
		$scope.auctionType = type;

		carregarLeiloes(type);
	};

	$scope.retirada = function retirada(auctionID) {
		const config = {
			method: 'POST',
			url: '/api/leilao/retirada',
			qs: {
				id: auctionID,
			},
			data: {
				id: auctionID,
			},
		};

		$scope.message = '';
		$scope.err = '';

		$scope.loading = {
			message: 'Efetuando retirada de livro...',
			state: true,
		};
		$http(config).then(function successCallback(response) {
			$scope.leiloes = $scope.leiloes.filter(function filterID(item) {
				return item._id !== auctionID;
			});
			alert('Leilão ' + auctionID + ' finalizado com sucesso.');
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

	pageRouter($location.path());
});
