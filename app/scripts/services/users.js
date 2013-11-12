
 angular.module('myappApp')
 	.factory("Users", function($http, $q, AppConfigurations, $cacheFactory){

 		var userUrl = AppConfigurations.baseUrl + "/users";
 		var $httpDefaultCache = $cacheFactory.get('$http'); 

 		return{
 			get: function(userId){

 				var defer = $q.defer();

 				$http({
 					method: 'GET',
    				url: userId ? userUrl + '/' + userId : userUrl,
    				cache: true
    			}).success(function (data){
    				defer.resolve(data);
    			}).error(function (data, status, headers, config){
    				defer.reject("could not retrieve users");
 				})
 				return defer.promise;
 			},

 			post: function(user){

 				var defer = $q.defer();

 				$http({
		            method: "POST",
		            url: userUrl,
		            data: {
		                firstName: user.firstName,
		                lastName: user.lastName,
		                nickName: user.nickName,
		                email: user.email
		            }
               	}).success(function (data, status, headers, config){
               		$httpDefaultCache.removeAll();
            		defer.resolve(data);
        		}).error(function (data,status,headers,config){
            		defer.reject("could not add user");
        		});

 				return defer.promise;
 			},

 			put: function(user){

 				var defer = $q.defer();

				$http({
					method: "PUT",
					url: userUrl + '/'+ user._id,
					data: {
						firstName: user.firstName,
						lastName: user.lastName,
						nickName: user.nickName,
						email: user.email
					}
				}).success(function (data,status,headers,config){
					$httpDefaultCache.removeAll();
					defer.resolve(data);
				}).error(function (data,status, headers, config){
					defer.reject("could not edit user");
				});

 				return defer.promise;
 			},

 			u_delete: function(user){

 				var defer = $q.defer();

				$http({
					method: "DELETE",
					url: userUrl + '/'+ user._id,
				}).success(function (data, status, headers, config){
					$httpDefaultCache.removeAll();
					defer.resolve(data);
				}).error(function (data, status, headers, config){
					defer.reject("could not delete user");
				});

 				return defer.promise;
 			}
 		}
 	})