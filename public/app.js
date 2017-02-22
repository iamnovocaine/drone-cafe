'use strict';

angular.module('myApp', [
  'ngRoute',
  /*'myApp.Client',
  'myApp.Kitchen',
  'myApp.Login'*/
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  //$routeProvider.otherwise({redirectTo: '/Login'});
}]);
