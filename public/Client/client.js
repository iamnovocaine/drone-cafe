'use strict';
angular.module('myApp').controller('client', function ($scope, $http, $location) {
	$scope.isAutorized = false;
	function check() {
		var data = sessionStorage.getItem('client');
		if(!data) {
			$location.path("/login");
		}
		else {
			$scope.isAutorized = true;
		}
	}	
	$scope.logout = function() {
		$scope.isAutorized = false;
		sessionStorage.removeItem('client');
		$location.path("/login");
    };
	check();
});