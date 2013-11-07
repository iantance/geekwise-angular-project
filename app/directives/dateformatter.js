angular.module('myappApp')	
	.directive("dateformatter", function(){
		return{
			require: 'ngModel',
			link: function(scope, elem, atts, ngModelCtrl){
				// ngModelCtrl.$parsers.push(function(value){
				// 	value = value.prototype.toString();
				// 	return value
				// })
				ngModelCtrl.$formatters.push(function(value){
					value = new Date(value);
					return value;
				});

			}
		}
	})