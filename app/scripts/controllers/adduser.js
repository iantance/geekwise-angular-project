'use strict';

  angular.module('myappApp')
  .controller('AddUserCtrl', function ($scope, $location, $http, Users) {

        $scope.user = {
            firstName :  '',
            lastName : '',
            nickName : '',
            email : ''
        }

        $scope.editView = false;
        

    $scope.save = function(user){

        var postPromise = Users.post(user)

        postPromise.then(function(data) {
            $location.path('/users');
        }, function(data){
            console.log(reason);
        })        

    }

  });
