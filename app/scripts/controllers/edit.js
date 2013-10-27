'use strict';

  angular.module('myappApp')
  .controller('EditUserCtrl', function ($scope, $routeParams, $location, $http) {
    $http({
        method: 'GET',
        url: 'http://geekwise-angularjs.herokuapp.com/iannance/users/' + $routeParams.userId
    }).success(function (data, status, headers, config){
        $scope.user = data[0];
    }).error(function (data, status, headers, config){
        console.warn("could not retreive user", status);
    });

    $scope.editView = true;

    $scope.save = function(){
        $http({
            method: "PUT",
            url: 'http://geekwise-angularjs.herokuapp.com/iannance/users/' + $scope.user._id,
            data: {
                firstName: $scope.user.firstName,
                lastName: $scope.user.lastName,
                nickName: $scope.user.nickName,
                email: $scope.user.email
            }
        }).success(function (data,status,headers,config){
            $location.path('/');
        }).error(function (data,status, headers, config){
            console.warn("could not update user", status);
        });
    }

    $scope.deleteUser = function(){
        $http({
            method: "DELETE",
            url: 'http://geekwise-angularjs.herokuapp.com/iannance/users/' + $scope.user._id,
        }).success(function (data, status, headers, config){
            $location.path('/');
        }).error(function (data, status, headers, config){
            console.warn("could not delete user", status);
        });
    }


  });
