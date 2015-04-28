"use strict";


var myApp = angular.module('myApp');

myApp.factory('answerService', ['$rootScope', function($rootScope){

	var answerServiceObject = {
		//kollar om svaret är rätt
		checkAnswer: function(correct, selected){
			if(correct && selected){
				console.log("rätt svar");
				return true;
			}else{
				return false;
			}
		},
		//Kollar om någon av frågorna har värdet true
		questionAnswered: function(choices){
			for(var i=0; i < choices.length; i++){
				if(choices[i].selected){
					$rootScope.runOnce = true;
					console.log("set to true");
				}
			}

			if($rootScope.runOnce){
				$("label").click(false);
			}
			return $rootScope.runOnce;
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
	}

	return dataService;


}]);