'use strict';



angular.module('myappApp')
  .controller('MainCtrl', function ($scope, $q, Users, Projects, $cookies,$cookieStore) {
    var getPromise = Users.get('');
    getPromise
        .then(function(data){
            $scope.users_count = data.length;
        },function(reason){
            console.log(reason);
        });

    var getPromise = Projects.get('');
    getPromise
        .then(function(data){
            $scope.projects_count = data.length;
        }, function(reason){
            console.log(reason);
        })



  });

