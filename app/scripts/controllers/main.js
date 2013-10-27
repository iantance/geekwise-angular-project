'use strict';



angular.module('myappApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http({
    	method: 'GET',
    	url: 'http://geekwise-angularjs.herokuapp.com/iannance/users'
    }).success(function (data, status, headers, config){
    	$scope.users = data;
    }).error(function (data, status, headers, config){
    	console.warn("couldn't retreive users", status);
    });

    $scope.query = '';

    $scope.searchSort = function (query){
    	return function (user){
            return user.lastName.toLowerCase().indexOf(query.toLowerCase()) != -1 ||
                    user.firstName.toLowerCase().indexOf(query.toLowerCase()) != -1 ||
                    user.nickName.toLowerCase().indexOf(query.toLowerCase()) != -1 ||
                    user.email.toLowerCase().indexOf(query.toLowerCase()) != -1
        }
    }

  });


