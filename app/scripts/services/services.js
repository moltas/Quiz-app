"use strict";


angular.module('myApp')
	.factory('answerService', [function(){

		var answerServiceObject = {
			checkAnswer: function(id, scope){

				  var correct = scope.questions[scope.counter].choices[id].correct;
			    var selected = scope.questions[scope.counter].choices[id].selected = true;

			    if(correct && selected){
			      scope.redOrGreen = 'green';
			    }else{
			      scope.redOrGreen = 'red';
			    }
			}
		};

		return answerServiceObject;

	}]);