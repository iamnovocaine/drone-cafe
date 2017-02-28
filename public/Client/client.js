'use strict';
angular.module('myApp').controller('client', function ($scope, $http, $location, $rootScope) {
	$rootScope.check();
	if(!$rootScope.isAutorized) {
		$location.path("/login");
	} else {
		$scope.clientInfo = '';
		var url = '/server/clients/?id=' + sessionStorage.getItem('client');
		$http.get(url).then(function(data) {
			if(!data.data.error) {
				$scope.clientInfo = data.data;
				$scope.addMoney = function() {				
					var url = '/server/clients/' + sessionStorage.getItem('client');
					$http.put(url).then(function(data) {
						Materialize.toast('Баланс пополнен', 4000);
						$scope.clientInfo.balance +=100;
					})
					.catch(function(data) {
						Materialize.toast('Баланс не пополнен', 4000);
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