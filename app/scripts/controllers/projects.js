'use strict';



angular.module('myappApp')
  .controller('ProjectsCtrl', function ($scope, $q, Projects) {


    var getPromise = Projects.get('')

        getPromise
        .then(function(data) {
            $scope.projects = data;
        },function(reason){
            console.log(reason);
        });

    $scope.query = '';

    $scope.searchSort = function (query){
    	return function (project){
            return project.title.toLowerCase().indexOf(query.toLowerCase()) != -1 ||
                    project.description.toLowerCase().indexOf(query.toLowerCase()) != -1 ||
                    project.status.toLowerCase().indexOf(query.toLowerCase()) != -1
        }
    }

  });

