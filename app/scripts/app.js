'use strict';

angular.module('myappApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize'
])
  .config(function ($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/add', {
        templateUrl: 'views/edit.html',
        controller: "AddUserCtrl"
      })
      .when('/edit/:userId', {
        templateUrl: 'views/edit.html',
        controller: "EditUserCtrl"
      })
      .otherwise({
        redirectTo: '/'
      });
  });
