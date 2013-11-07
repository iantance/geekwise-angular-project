
 angular.module('myappApp')
 	.factory("Messages", function($http, $q, AppConfigurations){

 		var messagesUrl = AppConfigurations.baseUrl + "/messages" 

 		return{

 			put: function(message){

 				var defer = $q.defer();

				$http({
					method: "PUT",
					url: messagesUrl + '/'+ message._id,
		            data: {
			            message:message.message
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