
//a directive that adds the animation green or red, depending if values are true
myApp.directive("greenOrRed", function($animate, answerService){
	return {
		restrict: 'A',
		scope: {
			'correct' : '=', //two way binding
			'selected' : '=',
			'index' : '@'
		},
		link: function(scope, elem, attr){
			attr.$observe('index', function(index){
				console.log(index);
			});
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
});

myApp.directive("navColor", function($animate){
	return {
		restrict: 'A',
		link: function(scope, elem, attr){
			console.log(attr.navColor);
		}
	}
});