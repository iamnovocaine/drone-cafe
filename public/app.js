'use strict';
var myApp = angular.module('myApp', ['ngRoute', 'ngCookies'  /*'myApp.Client','myApp.Kitchen','myApp.Login'*/]);

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
		.when('/kitchen', {
			templateUrl: 'Kitchen/kitchen.html',
			controller: 'kitchen'
		})
		.otherwise({
			redirectTo: '/login'
		});	
}]);

myApp.controller('kitchen', ['$scope', '$http', '$location', function($scope, $http, $location) {
	
}]);
myApp.controller('client', ['$scope', '$http', '$location', function($scope, $http, $location, $routeParams) {
	//$scope.client = $routeParams.client;
}]);