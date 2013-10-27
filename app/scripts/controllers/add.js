'use strict';

  angular.module('myappApp')
  .controller('AddUserCtrl', function ($scope, $location, $http) {

        $scope.user = {
            firstName :  '',
            lastName : '',
            nickName : '',
            email : ''
        }

        $scope.editView = false;
        

    $scope.save = function(){
        $http({
            method: "POST",
            url: 'http://geekwise-angularjs.herokuapp.com/iannance/users',
            data: {
                firstName: $scope.user.firstName,
                lastName: $scope.user.lastName,
                nickName: $scope.user.nickName,
                email: $scope.user.email
            }
        }).success(function (data, status, headers, config){
            $location.path('/');
        }).error(function (data,status,headers,config){
            console.warn("user not added", status);
        });
    }

  });
