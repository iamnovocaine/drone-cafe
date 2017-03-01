'use strict';
angular.module('myApp').controller('dish', function ($scope, $http, $location, $rootScope) {
	$rootScope.check();
	if(!$rootScope.isAutorized) {
		$location.path("/login");
	} else {
		$scope.dishes = {};
		var url = '/server/dishes';
		$http.get(url).then(function(data) {
			if(!data.data.error) {
				$scope.dishes = data.data;
				$scope.addDish = function(id) {
					var url = '/server/orders/';
					$http.post(url, {"client": sessionStorage.getItem('client'), "dish": id}).then(function(data) {
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
	}
});