'use strict';



angular.module('myappApp')
  .controller('ProjectsCtrl', function ($scope, $q, Projects, $location, AppConfigurations) {


    var getPromise = Projects.get('')

        getPromise
        .then(function(data) {
            $scope.projects = data;
        },function(reason){
            console.log(reason);
        });
    $scope.ADMIN_ID = AppConfigurations.ADMIN_ID;
    $scope.loginuser = {_id:"0"};

    $scope.query = '';
   

    $scope.searchSort = function (query){
    	return function (project){
            return project.title.toLowerCase().indexOf(query.toLowerCase()) != -1 ||
                    project.description.toLowerCase().indexOf(query.toLowerCase()) != -1 ||
                    project.status.toLowerCase().indexOf(query.toLowerCase()) != -1
        }
    }

  });

