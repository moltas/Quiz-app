'use strict';

/**
 * @ngdoc overview
 * @name myApp
 * @description
 * # myApp
 *
 * Main module of the application.
 */
var myApp = angular.module('myApp', [
  'ngRoute',
  'ngAnimate'
]);

  //Routes
myApp.config(["$routeProvider", function ($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'partials/landing_page.html',
      controller: 'MainCtrl'
    })
    .when('/quiz', {
      templateUrl: 'partials/questions.html',
      controller: 'MainCtrl'
    })
    .when('/result_page', {
      templateUrl: 'partials/result_page.html',
      controller: 'resultsCtrl'
    })
    .when('/createquestion', {
      templateUrl: 'partials/createQuestion.html',
      controller: 'CreateQuestionCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
var myApp = angular.module('myApp');

myApp.controller('MainCtrl', [ '$scope',
                               '$timeout',
                               '$rootScope',
                               'answerService',
                               'questions',
                               '$location', 
                               'dataService', 
function ($scope, $timeout, $rootScope, answerService, questions, $location, dataService) {


    // variables
  $scope.counter = 0;
  $scope.playerScore = 0;
  var questionLength = null;
  $rootScope.runOnce = false; //stop user from choosing multiple answers
  var running = false; //stop user from clicking multiple times on a answer

  //the array that holds all the questions
  $scope.questions = [];

  //grabs the items from the database
  var refresh = function(){
    questions.getQuestions().success(function(results){
      $scope.questions = results;
      questionLength = $scope.questions.length-1;
    });

  };

  refresh();

  $scope.changeView = function(view){
    $location.path(view)
  };

  //watches counter and changes view if last question
  $scope.$watch('counter', function(counter){
    $rootScope.runOnce = false;  
    $timeout(function(){ //prevents view from changing too quickly
      running = false;
    }, 1000);
    
    if(counter > questionLength){ //if last question, changes to result page
      addPlayerScore();
      $scope.changeView("/result_page");
    }
  });

  $scope.next = function(){
    $scope.counter++;
  }

  //sets the counter to the index of the clicked anchor
  $scope.setCounter = function(index){
    $scope.counter = index;  
  };

  $scope.saveAnswer = function(choice, options, index){

    var correct = choice.correct;

    //Kollar om någon av frågorna har värdet true o sätter runOnce till true isf
    answerService.questionAnswered(options);

    if($rootScope.runOnce){
      var selected = false;
    }else{
      var selected = choice.selected = true;
    }
    
    //kollar ifall svar är rätt eller fel
    if(answerService.checkAnswer(correct, selected, index)){
      $scope.playerScore++;     
    }

    //calls the method in 1.5sec
    if(selected){
      $timeout(function(){
        if(running === false){
          $scope.next();
          running = true;
        }  
      }, 1500);
    }
  };
  
  //adds values to a service so they can be displayed on the result screen
  var addPlayerScore = function(){
    dataService.setData($scope.playerScore);
    dataService.setLength(questionLength+1); 
  };

}]);


// This controller handles setting the active class in the header
myApp.controller('headerCtrl', ['$scope', '$location', function($scope, $location){

  // Is used in the header to check if current view is 
  // equal to the location path
  $scope.isActive = function(view){
    return view === $location.path();
  };

}]);
myApp.controller('resultsCtrl', ['$scope','dataService', function($scope, dataService){

  $scope.playerScore = dataService.data;
  $scope.questionLength = dataService.length;


  if($scope.questionLength > 1){
    $scope.percent = Math.floor(($scope.playerScore/$scope.questionLength) * 100);
  }else{
    $scope.percent = 0;
  }

  $scope.showScores = function(scores){
    if(scores == 100){
      return "Grattis! Alla rätt!";
    }else if(scores >= 90){
      return "Få besitter dina kunskaper om Westeros";
    }else if(scores >= 70){
      return "Du är bättre än få";
    }else if(scores >= 50){
      return "Du är lagomt dålig";
    }else if(scores >= 30){
      return "You know nothing, Jon Snow";
    }else{
      return "You know nothing, Jon Snow";
    }
  };

  $scope.result = $scope.showScores($scope.percent);
}]);

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




myApp.factory('questions', ['$http', function($http){

	var baseUrl = '/api/questions';
	var questions = {};

	questions.getQuestions = function(){
		return $http.get(baseUrl);
	};

	questions.postQuestion = function(question){
		return $http.post(baseUrl, question)
	}

	questions.deleteQuestion = function(id){
		return $http.delete(baseUrl + '/' + id);
	}

	return questions;
}]);

//a directive that adds the animation green or red, depending if values are true
myApp.directive("greenOrRed", ["$animate", "answerService", function($animate, answerService){
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
}]);

myApp.directive("navColor", ["$animate", function($animate){
	return {
		restrict: 'A',
		link: function(scope, elem, attr){
			console.log(attr.navColor);
		}
	}
}]);