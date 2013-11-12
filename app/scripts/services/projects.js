
 angular.module('myappApp')
 	.factory("Projects", function($http, $q, AppConfigurations, $cacheFactory){

 		var projectsUrl = AppConfigurations.baseUrl + "/projects";
 		var $httpDefaultCache = $cacheFactory.get('$http');  

 		return{
 			clearCache: function(){
 				$httpDefaultCache.removeAll();
 			},
 			get: function(projectId){

 				var defer = $q.defer();

 				$http({
 					method: 'GET',
    				url: projectId ? projectsUrl + '/' + projectId : projectsUrl,
    				cache: true
    			}).success(function (data){
    				defer.resolve(data);
    			}).error(function (data, status, headers, config){
    				defer.reject("could not retrieve projects");
 				})
 				return defer.promise;
 			},

 			post: function(project){

 				var defer = $q.defer();

 				$http({
		            method: "POST",
		            url: projectsUrl,
		            data: {
			            title :  project.title,
			            description : project.description,
			            dueDate: project.dueDate,
			            status : project.status,
			            team : project.team
		            }
               	}).success(function (data, status, headers, config){
               		$httpDefaultCache.removeAll();
            		defer.resolve(data);
        		}).error(function (data,status,headers,config){
            		defer.reject("could not add project");
        		});

 				return defer.promise;
 			},

 			postConvo: function(conversation, projectId){

 				var defer = $q.defer();

 				$http({
		            method: "POST",
		            url: projectsUrl+ "/" + projectId + "/conversations",
		            data: {
			            subject: conversation.subject
		            }
               	}).success(function (data, status, headers, config){
            		defer.resolve(data);
            		$httpDefaultCache.removeAll();
        		}).error(function (data,status,headers,config){
            		defer.reject("could not add project");
        		});

 				return defer.promise;
 			},

 			postMessage: function(messages, projectId, convoId){

 				var defer = $q.defer();

 				$http({
		            method: "POST",
		            url: projectsUrl+ "/" + projectId + "/conversations/" + convoId + "/messages",
		            data: {
			            message: messages.message,
			            user:messages.user._id
		            }
               	}).success(function (data, status, headers, config){
               		$httpDefaultCache.removeAll();
            		defer.resolve(data);
        		}).error(function (data,status,headers,config){
            		defer.reject("could not add project");
        		});

 				return defer.promise;
 			},

 			put: function(project){

 				var defer = $q.defer();

				$http({
					method: "PUT",
					url: projectsUrl + '/'+ project._id,
		            data: {
			            title :  project.title,
			            description : project.description,
			            dueDate: project.dueDate,
			            status : project.status,
			            team : project.team
		            }
				}).success(function (data,status,headers,config){
					$httpDefaultCache.removeAll();
					defer.resolve(data);
				}).error(function (data,status, headers, config){
					defer.reject("could not edit project");
				});

 				return defer.promise;
 			},

 			p_delete: function(project){

 				var defer = $q.defer();

				$http({
					method: "DELETE",
					url: projectsUrl + '/'+ project._id,
				}).success(function (data, status, headers, config){
					$httpDefaultCache.removeAll();
					defer.resolve(data);
				}).error(function (data, status, headers, config){
					defer.reject("could not delete project");
				});

 				return defer.promise;
 			}
 		}
 	})