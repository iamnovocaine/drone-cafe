'use strict';
angular.module('myApp').controller('login', function ($scope, $http, $location/*, $cookieStore*/) {
	$scope.login = function() {
		var url = '/server/clients/' + this.email;
		$http.get(url).then(function(data) {
			if(data.data.error) {
				var url = '/server/clients/';
				//нет на сайте, добавляем нового клиента
				var newClient = {"name": $scope.name, "email": $scope.email};
				$http.post(url, newClient).then(function(data) {
					sessionStorage.setItem('client', data.data._id);
					$location.path("/");                   
				})
				.catch(function(data) {
					console.log(data);
				})
			} else {
				//есть на сайте
				sessionStorage.setItem('client', data.data._id);
                $location.path("/");
			}		
		})
		.catch(function(data) {
			console.log(data);
		})
	}
});