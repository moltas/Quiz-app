"use strict";


var myApp = angular.module('myApp');

myApp.factory('answerService', ['$rootScope', function($rootScope){

	var answerServiceObject = {
		//checks answer and adds css classes
		checkAnswer: function(correct, selected, index){
			if(correct && selected){
				$("#" + index).addClass("right"); 
				$(".answer").removeClass("blue");

				return true;

			}else if(!correct && selected){
				$("#" + index).addClass("wrong");
				$(".answer").removeClass("blue");

				return false;
			}
		},
		//iterates answers and sets runOnce to true if any answer is selected
		questionAnswered: function(choices){
			for(var i=0; i < choices.length; i++){
				if(choices[i].selected){
					$rootScope.runOnce = true;
					console.log("set to true");
				}
			};

			if($rootScope.runOnce){
				$("label").click(false);
			};
		}
	};

	return answerServiceObject;

}]);

myApp.factory('dataService', [ function(){

	var dataService = {};

	dataService.setData =  function(value){
		dataService.data = value;
	};

	dataService.setLength = function(value){
		dataService.length = value;
	};

	return dataService;


}]);

