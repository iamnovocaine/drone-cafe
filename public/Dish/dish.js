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
				/*$scope.addMoney = function() {				
					var url = '/server/clients/' + sessionStorage.getItem('client');
					$http.put(url).then(function(data) {
						Materialize.toast('Баланс пополнен', 4000);
						$scope.clientInfo.balance +=100;
					})
					.catch(function(data) {
						Materialize.toast('Баланс не пополнен', 4000);
						console.log(data);
					});
				}*/
			}
		})
		.catch(function(data) {
			console.log(data);
		});
	}
});