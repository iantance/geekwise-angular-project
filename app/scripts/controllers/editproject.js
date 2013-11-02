'use strict';

  angular.module('myappApp')
  .controller('EditProjectCtrl', function ($scope, $routeParams, $location, $http, Projects, Users, project, users) {
        
    $scope.project = project[0];
    $scope.users = users;
    $scope.editView = true;

    $scope.save = function(project){

        var putPromise = Projects.put(project);

        putPromise
        .then(function(data){
            $location.path('/projects');
        },function(){
            console.log(reason);
        })

        // $http({
        //     method: "PUT",
        //     url: 'http://geekwise-angularjs.herokuapp.com/iannance/users/' + $scope.user._id,
        //     data: {
        //         firstName: $scope.user.firstName,
        //         lastName: $scope.user.lastName,
        //         nickName: $scope.user.nickName,
        //         email: $scope.user.email
        //     }
        // }).success(function (data,status,headers,config){
        //     $location.path('/');
        // }).error(function (data,status, headers, config){
        //     console.warn("could not update user", status);
        // });
    }

    $scope.deleteProject = function(project){

        var deletePromise = Projects.p_delete(project)

        deletePromise
        .then(function(){
            $location.path('/projects');
        }, function(reason){
            console.log(reason);
        })

        // $http({
        //     method: "DELETE",
        //     url: 'http://geekwise-angularjs.herokuapp.com/iannance/users/' + $scope.user._id,
        // }).success(function (data, status, headers, config){
        //     $location.path('/');
        // }).error(function (data, status, headers, config){
        //     console.warn("could not delete user", status);
        // });
    }


  });
