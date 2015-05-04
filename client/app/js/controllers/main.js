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