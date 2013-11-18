'use strict';

  angular.module('myappApp')
  .controller('EditUserCtrl', function ($scope, $routeParams, $location, $http, Users) {
    
    var getPromise = Users.get($routeParams.userId);

    getPromise
    .then(function(data){
        $scope.user = data[0];
    }, function(){
        console.log(reason);
    });


    $scope.editView = true;

    $scope.save = function(user){

        var putPromise = Users.put(user);

        putPromise
        .then(function(data){
            $location.path('/users');
        },function(data){
            console.log(reason)
        })

    }

    $scope.deleteUser = function(user){

        var deletePromise = Users.u_delete(user)

        deletePromise
        .then(function(){
            $location.path('/users');
        }, function(){
            console.log(reason);
        })


    }


  });
