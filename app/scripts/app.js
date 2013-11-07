'use strict';

angular.module('myappApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.bootstrap',
  'ui.date'
])
  .config(function ($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
        templateUrl: "views/main.html",
        controller: 'MainCtrl'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      })
      .when('/users/add', {
        templateUrl: 'views/edituser.html',
        controller: "AddUserCtrl"
      })
      .when('/users/edit/:userId', {
        templateUrl: 'views/edituser.html',
        controller: "EditUserCtrl"
      })
      .when('/projects',{
        templateUrl:'views/projects.html',
        controller: "ProjectsCtrl"
      })
      .when('/projects/add',{
        templateUrl: 'views/editproject.html',
        controller: "AddProjectCtrl",
        resolve: {
                users: function(Users, $q) {
                    var deferred = $q.defer();
                    Users.get('')
                    .then(function(data) {
                        deferred.resolve(data); 
                    }, function(errorData) {
                        deferred.reject(); 
                    });
                    return deferred.promise;
                    }
                } 
      })
      .when('/projects/edit/:projectId',{
        templateUrl: "views/editproject.html",
        controller: "EditProjectCtrl",
        resolve: {
                project: function(Projects, $q, $route){
                  var deferred = $q.defer();
                  Projects.get($route.current.params.projectId)
                  .then(function(data){
                    deferred.resolve(data);
                  },function (errorData){
                    deferred.reject();
                  });
                  return deferred.promise;
                },
                users: function(Users, $q) {
                  var deferred = $q.defer();
                  Users.get('')
                  .then(function(data) {
                    deferred.resolve(data); 
                  }, function(errorData) {
                    deferred.reject(); 
                  });
                  return deferred.promise;
                }
              }
      })
      .when('/projects/:projectId/conversations',{
        templateUrl:"views/conversations.html",
        controller:"ConvoCtrl"
      })
      .otherwise({
        redirectTo: '/'
      });
  });

 angular.module("myappApp").value("AppConfigurations", {
  baseUrl: 'http://geekwise-angularjs.herokuapp.com/iannance'
 })
