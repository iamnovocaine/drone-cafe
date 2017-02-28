'use strict';
angular.module('myApp').controller('login', function ($scope, $http, $location, $rootScope) {
	$scope.login = function() {
		var url = '/server/clients/' + this.email;
		$http.get(url).then(function(data) {
			if(data.data.error) {
				var url = '/server/clients/';
				//��� �� �����, ��������� ������ �������
				var newClient = {"name": $scope.name, "email": $scope.email};
				$http.post(url, newClient).then(function(data) {
					sessionStorage.setItem('client', data.data._id);
					$location.path("/");
					$rootScope.isAutorized = true;
					
				})
				.catch(function(data) {
					console.log(data);
				})
			} else {
				sessionStorage.setItem('client', data.data._id);
				$rootScope.isAutorized = true;
                $location.path("/");
			}		
		})
		.catch(function(data) {
			console.log(data);
		})
	}
});