'use strict';

angular.module('myappApp')
  .controller('AddProjectCtrl', function ($scope, $location, $http, Projects, Users, users) {

        $scope.project = {
            title :  '',
            description : '',
            status : '',
            team : []
        }

        $scope.editView = false;
        console.log($scope.editView);

        $scope.users = users;
 

    $scope.save = function(project){


        var postPromise = Projects.post(project)

        postPromise.then(function(data) {
            console.log()
            $location.path('/projects');
        }, function(reason){
            console.log(reason);
        });        

    }

  });


