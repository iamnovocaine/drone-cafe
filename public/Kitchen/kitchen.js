myApp.controller('kitchen', ['$scope', '$http', '$location', function($scope, $http, $location, $rootScope, SocketKithen){
	$scope.orders = [];
	var url = '/server/orders/?status=Заказано';
	$http.get(url).then(function(data) {
		if(!data.data.error) {
			$scope.orders = data.data;				
			$scope.getDish = function(id) {
				var url = '/server/dishes/'+ id;
				$http.get(url).then(function(data) {
					//return data.data.title;
					console.log(data);
				})
				.catch(function(data) {
					console.log(data);
				});
			}
		}
	})
	.catch(function(data) {
		console.log(data);
	});
}]);