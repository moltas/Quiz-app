
//a directive that adds the animation green or red, depending if values are true
myApp.directive("greenOrRed", ["$animate", "answerService", function($animate, answerService){
	return {
		restrict: 'A',
		scope: {
			'correct' : '=', //two way binding
			'selected' : '='
		},
		link: function(scope, elem, attr){
			scope.$watchGroup(['correct', 'selected'], function(values){
				var correct = values[0];
				var selected = values[1];
				
				if(correct && selected){
					$animate.addClass(elem, "green");
				}else if(!correct && selected){
					$animate.addClass(elem, "red");
				}
			});

		}
	}
}]);
