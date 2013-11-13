angular.module('myappApp')	
	.directive("navbarlogin", function(){
		return{
			templateUrl:"views/navbar.html",
			controller:function($scope, $cookies, $cookieStore){
				$scope.loginuser = $cookieStore.get("user") ? $cookieStore.get("user"): {lastName:"NOT LOGGED IN"};
			}

		}
	});