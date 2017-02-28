'use strict';
angular.module('myApp').controller('client', function ($scope, $http, $location, $rootScope) {
	$rootScope.check();
	if(!$rootScope.isAutorized) {
		$location.path("/login");
	}
});