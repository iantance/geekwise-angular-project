'use strict';

  angular.module('myappApp')
  .controller('EditProjectCtrl', function ($scope, $routeParams, $location, $http, Projects, Users, project, users) {
        
    $scope.project = project[0];
    $scope.users = users;
    $scope.editView = true;

    $scope.save = function(project){
        console.log(project);

        var putPromise = Projects.put(project);

        putPromise
        .then(function(data){
            $location.path('/projects');
        },function(){
            console.log(reason);
        })

    }

    $scope.deleteProject = function(project){

        var deletePromise = Projects.p_delete(project)

        deletePromise
        .then(function(){
            $location.path('/projects');
        }, function(reason){
            console.log(reason);
        })

    }


  });
