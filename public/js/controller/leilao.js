/* global ngapp */

ngapp.controller('leilaoController', function leilaoController($scope, $http, $routeParams) {
	$scope.leilao = {};

	function updateNextPrice() {
		if ($scope.leilao.bids.length > 0) {
			const nextPrice = parseInt($scope.leilao.currentPrice * 1.1, 10);

			if (nextPrice > $scope.leilao.currentPrice) {
				$scope.leilao.nextPrice = nextPrice;
			} else {
				$scope.leilao.nextPrice = nextPrice + 1;
			}
		} else {
			$scope.leilao.nextPrice = $scope.leilao.currentPrice;
		}

		$scope.bidvalue = $scope.leilao.nextPrice;
	}

	function buscarLeilao() {
		const config = {
			method: 'GET',
			url: '/api/leilao/buscar',
			params: {
				id: $routeParams.id,
			},
		};

		$scope.loading = true;
		$http(config).then(function successCallback(response) {
			$scope.leilao = response.data;
			updateNextPrice();

			$scope.bidvalue = $scope.leilao.nextPrice;
			$scope.loading = false;
			$scope.error = false;
		}, function errorCallback(response) {
			$scope.error = `${response.status}: ${response.statusText}`;
			$scope.loading = false;
		});
	}

	$scope.efetuarLance = function efetuarLance() {
		if ($scope.bidvalue >= $scope.leilao.nextPrice) {
			const config = {
				method: 'POST',
				url: '/api/leilao/lance',
				params: {
					auctionid: $routeParams.id,
					bid: $scope.bidvalue,
				},
			};

			$scope.loading = true;
			$http(config).then(function successCallback(response) {
				alert(`Lance de ${response.data.bidValue} efetuado com sucesso.`);
				$scope.leilao.currentPrice = response.data.bidValue;
				updateNextPrice();

				$scope.leilao.bids = response.data.bids;
				$scope.leilao.state = response.data.state;

				$scope.loading = false;
				$scope.error = false;
			}, function errorCallback(response) {
				$scope.error = `${response.status}: ${response.statusText}`;
				$scope.loading = false;
			});
		} else {
			alert(`Lance mínimo: ${$scope.leilao.nextPrice}`);
			$scope.bidvalue = $scope.leilao.nextPrice;
		}
	};

	buscarLeilao();
});
