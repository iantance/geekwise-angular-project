
 angular.module('myappApp')
 	.factory("Conversations", function($http, $q, AppConfigurations){

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
					defer.resolve(data);
				}).error(function (data,status, headers, config){
					defer.reject("could not edit project");
				});

 				return defer.promise;
 			}

 		}
 	})