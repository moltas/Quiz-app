
'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
myApp.controller('CreateQuestionCtrl', ['$scope', 'questions', function($scope, questions){

	// var question = new questions();
	
	$scope.correct1 = false, $scope.correct2 = false, $scope.correct3 = false, $scope.correct4 = false;
	$scope.questions = [];

	var refresh = function(){
		questions.getQuestions().success(function(results){
			$scope.questions = results;
			console.log($scope.questions.choices);
		});

	};
	
	refresh();


	$scope.addQuestion = function(){


		$scope.question.choices = [];
		$scope.question.choices.push({text: $scope.option1, correct: $scope.correct1, selected: false},
																 {text: $scope.option2, correct: $scope.correct2, selected: false},
																 {text: $scope.option3, correct: $scope.correct3, selected: false},
																 {text: $scope.option4, correct: $scope.correct4, selected: false});

		questions.postQuestion($scope.question).success(function(){
			$scope.questions.push($scope.question);
			$scope.question = "", $scope.option1 = "", $scope.option2 = "", $scope.option3 = "", $scope.option4 = "";
		});

		refresh();

	};

	$scope.deleteQuestion = function(id){

		// console.log(question);
		questions.deleteQuestion(id).success(function(){
			console.log("fire!.. Delete!");
			refresh();
		});

	};


}]);

