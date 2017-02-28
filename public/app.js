'use strict';
var myApp = angular.module('myApp', ['ngRoute', 'ngCookies'  /*'myApp.Client','myApp.Kitchen','myApp.Login'*/]);

myApp.run(['$rootScope', '$location', function($rootScope, $location) {
	$rootScope.isAutorized = false;
	$rootScope.check = function () {
		var data = sessionStorage.getItem('client');
		if(!data) {
			$location.path("/login");
			$rootScope.isAutorized = false;
		}
		else {
			$rootScope.isAutorized = true;
		}
	};
	
	$rootScope.logout = function() {
		$rootScope.isAutorized = false;
		sessionStorage.removeItem('client');
    };
}])
myApp.config(['$routeProvider', '$locationProvider', function($routeProvide, $locationProvider) {
	$locationProvider.html5Mode({
		enable: true,
		requireBase: false
	})
	
	$routeProvide
		.when('/', {
			templateUrl: 'Client/client.html',
			controller: 'client'
		})
		.when('/login', {
			templateUrl: 'Login/login.html',
			controller: 'login'
		})
		.when('/dishes', {
			templateUrl: 'Dish/dish.html',
			controller: 'dish'
		})
		.when('/kitchen', {
			templateUrl: 'Kitchen/kitchen.html',
			controller: 'kitchen'
		})
		.otherwise({
			redirectTo: '/login'
		});	
}]);