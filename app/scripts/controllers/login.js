'use strict';



angular.module('myappApp')
  .controller('LoginCtrl', function ($scope, $q, users, $cookies, $cookieStore, $location, $route, AppConfigurations) {
    $scope.users = users;
    // $scope.users.push({
    //     lastName:'ADMIN',
    //     firstName:"",
    //     _id:AppConfigurations.ADMIN_ID
    // });

    $scope.users.reverse();
    $scope.$watch('loginuser', function (newVal) {
        for (var i = users.length - 1; i >= 0; i--) {
            if ($scope.loginuser && users[i]._id==$scope.loginuser._id){
                $scope.newloginuser = users[i];
            }
        };
    });

 


    $scope.login = function(loginuser){
        $cookieStore.put('user', loginuser);
        $location.path("/");
    }

    $scope.logout = function(){
        var user = $cookieStore.get("user");
        $cookieStore.remove("user");
        var user = $cookieStore.get("user");
        $route.reload();
    }

  });

