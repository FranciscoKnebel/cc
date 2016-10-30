/* global ngapp */

ngapp.controller('leilaoController', function leilaoController($scope, $http, $routeParams) {
	$scope.leilao = {};

	function buscarLeilao() {
		const config = {
			method: 'GET',
			url: '/api/buscar/leilao',
			params: {
				id: $routeParams.id,
			},
		};

		$scope.loading = true;
		$http(config).then(function successCallback(response) {
			$scope.leilao = response.data;
			if ($scope.leilao.bids.length > 0) {
				$scope.leilao.nextPrice = $scope.leilao.currentPrice * 1.1;
			} else {
				$scope.leilao.nextPrice = $scope.leilao.currentPrice;
			}
			$scope.loading = false;
			$scope.error = false;
		}, function errorCallback(response) {
			$scope.error = response.status + ": " + response.statusText;
			$scope.loading = false;
		});
	}

	buscarLeilao();
});
