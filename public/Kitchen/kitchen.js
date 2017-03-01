myApp.controller('kitchen', ['$scope', '$http', '$location', function($scope, $http, $location, $rootScope, SocketKithen){
	$scope.newOrders = [];
	$scope.orders = [];
	var url = '/server/orders/?status=Заказано';
	$http.get(url).then(function(data) {
		if(!data.data.error) {
			$scope.newOrders = data.data;
		}
	})
	.catch(function(data) {
		console.log(data);
	});
	
	var url = '/server/orders/?status=Готовится';
	$http.get(url).then(function(data) {
		if(!data.data.error) {
			$scope.orders = data.data;
		}
	})
	.catch(function(data) {
		console.log(data);
	});
	
	$scope.startCook = function(id, index) {
		var url = '/server/orders/' + id;
		$http.put(url, {"status": "Готовится"}).then(function(data) {
			if(!data.data.error) {
				Materialize.toast('Блюдо готовится', 1000);
				$scope.newOrders.splice(index, 1);
				$scope.orders.push(data.data);
			}
		})
		.catch(function(data) {
			console.log(data);
		});
	}
	
	$scope.finishCook = function(id, index) {
		var url = '/server/orders/' + id;
		$http.put(url, {"status": "Доставляется"}).then(function(data) {
			if(!data.data.error) {
				Materialize.toast('Блюдо готово!', 1000);
				$scope.orders.splice(index, 1);
				//отправить на доставку
			}
		})
		.catch(function(data) {
			console.log(data);
		});
	}
}]);