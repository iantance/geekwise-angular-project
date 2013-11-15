angular.module('myappApp')	
	.directive("dateformatter", function(){
		return{
			require: 'ngModel',
			link: function(scope, elem, atts, ngModelCtrl){
				ngModelCtrl.$formatters.push(function(value){
					value = new Date(value);
					return value;
				});

			}
		}
	})