angular.module('myApp')
	.directive('my-directive', ['$animate', function($animate) {
	  return function(scope, element, attrs) {
	    element.on('click', function() {
	      if(element.hasClass('clicked')) {
	        $animate.removeClass(element, 'clicked');
	      } else {
	        $animate.addClass(element, 'clicked');
	      }
	    });
	  };
	}]);