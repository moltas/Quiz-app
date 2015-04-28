
//a directive that adds the animation green or red, depending if values are true
myApp.directive("greenOrRed", function($animate){
	return {
		restrict: 'A',
		scope: {
			'correct' : '=', //two way binding
			'selected' : '=',
			'greenOrRed' : '='
		},
		link: function(scope, elem, attr){
			scope.$watchGroup(['correct', 'selected'], function(values){
				var correct = values[0];
				var selected = values[1];

				if(correct && selected){
					$animate.addClass(elem, "green");
					scope.hello();
				}else if(!correct && selected){
					$animate.addClass(elem, "red");
				}
			});
			scope.hello = function(){
				console.log(scope.greenOrRed);
			}
		}
	}
});