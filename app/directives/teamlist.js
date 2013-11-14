angular.module('myappApp')	
	.directive("teamlist", function(AppConfigurations){
		return{
			scope:{
				team: "=",
				users: "="
			},
			controller:function($scope){
				$scope.space = " ";
				$scope.tempTeam = $scope.team;

				$scope.noAdmin = function(){
        			return function (user){
            			return user._id != AppConfigurations.ADMIN_ID;
        			}
    			};
				$scope.teamToIds = function(){
					$scope.team = [];
	  				for (var i = $scope.tempTeam.length-1; i>=0; i--){
	  					$scope.team.push($scope.tempTeam[i]._id);
	  				}
				};

				$scope.teamToIds();
				
				$scope.addToTeam = function(member){
	  			if (member && $scope.tempTeam.indexOf(member) === -1){
					$scope.tempTeam.push(member);
					$scope.team.push(member._id);
				}

	  			};

		  		$scope.removeMembers = function(){
		  			for (var i = $scope.tempTeam.length-1; i>=0; i--){
		  				var mem = $scope.tempTeam[i];
		  				if (mem.remove){
		  					$scope.tempTeam.splice(i, 1)
		  				}
		  			}
		  			$scope.teamToIds();
		  		};

		  	},
			template: "<select class = 'form-control' ng-model = 'member' ng-options='user as [user.lastName, space+user.firstName] for user in users | filter:noAdmin()'>"+
						"<option value=''>- select new member -</option></select>" +
					        "<button ng-click ='addToTeam(member)' class='btn btn-default add' type='button'>Add Member</button>" +
					    "<label class='form-label'>members:</label>"+
						"<ul>"+
							"<li ng-repeat = 'member in tempTeam | filter:noAdmin()'>"+
							"<input type = 'checkbox' ng-model= 'member.remove'/>{{member.lastName}}, {{member.firstName}}</li>"+
							"<button class='btn btn-default remove' ng-click='removeMembers()'>Remove Selected</button>"+
						"</ul>"
		}
	})