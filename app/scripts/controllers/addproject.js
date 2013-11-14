'use strict';

angular.module('myappApp')
  .controller('AddProjectCtrl', function ($scope, $location, $http, Projects, Users, users, AppConfigurations) {

        $scope.project = {
            title :  '',
            description : '',
            status : '',
            team : []
        }

        $scope.editView = false;

        $scope.users = users;
 
 

    $scope.save = function(project){
        project.team.push(AppConfigurations.ADMIN_ID);
        var postPromise = Projects.post(project)

        postPromise.then(function(data) {
            console.log()
            $location.path('/projects');
        }, function(reason){
            console.log(reason);
        });        

    }

  });


