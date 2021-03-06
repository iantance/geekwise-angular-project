
 angular.module('myappApp')
 	.factory("Conversations", function($http, $q, AppConfigurations, Projects){

 		var conversationsUrl = AppConfigurations.baseUrl + "/conversations"; 

 		return{

 			put: function(conversation){

 				var defer = $q.defer();

				$http({
					method: "PUT",
					url: conversationsUrl + '/'+ conversation._id,
		            data: {
			            subject:conversation.subject
		            }
				}).success(function (data,status,headers,config){
					Projects.clearCache();
					defer.resolve(data);
				}).error(function (data,status, headers, config){
					defer.reject("could not edit conversation");
				});

 				return defer.promise;
 			},

 			c_delete: function(conversation){

 				var defer = $q.defer();

				$http({
					method: "DELETE",
					url: conversationsUrl + '/'+ conversation._id
				}).success(function (data,status,headers,config){
					Projects.clearCache();
					defer.resolve(data);
				}).error(function (data,status, headers, config){
					defer.reject("could not delete conversation");
				});

 				return defer.promise;
 			}

 		}
 	})