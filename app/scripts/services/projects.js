
 angular.module('myappApp')
 	.factory("Projects", function($http, $q, AppConfigurations){

 		var projectsUrl = AppConfigurations.baseUrl + "/projects" 

 		return{
 			get: function(projectId){

 				var defer = $q.defer();

 				$http({
 					method: 'GET',
    				url: projectId ? projectsUrl + '/' + projectId : projectsUrl,
    				// cache: true
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
			            status : project.status,
			            team : project.team
		            }
               	}).success(function (data, status, headers, config){
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
			            status : project.status,
			            team : project.team
		            }
				}).success(function (data,status,headers,config){
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
					defer.resolve(data);
				}).error(function (data, status, headers, config){
					defer.reject("could not delete project");
				});

 				return defer.promise;
 			}
 		}
 	})