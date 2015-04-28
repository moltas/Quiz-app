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

  // # ISSUES

  //När view ändras från questions till result_page så nollställs scope.playerSCore

  //När man klickar flera gånger på ett alternativ så kallas metoden next flera gånger

    // variables
  $scope.counter = 0;
  // $scope.answer = 0;
  $scope.redOrGreen = '';

  $scope.playerScore = 0;
  var questionLength = null;

  $rootScope.runOnce = false; //stop user from choosing multiple answers
  var running = false; //stop user from clicking multiple times on a answer

  //the array that holds all the questions
  $scope.questions = [];

  var refresh = function(){
    questions.getQuestions().success(function(results){
      $scope.questions = results;
      questionLength = $scope.questions.length-1;
    });

  };

  refresh();

  var changeView = function(view){
    $location.path(view)
  };

  //watches counter and changes view if last question
  $scope.$watch('counter', function(counter){
    $rootScope.runOnce = false;  
    $timeout(function(){
      running = false;
    }, 1000);
    
    if(counter > questionLength){
      addPlayerScore();
      changeView("/result_page");
    }
  });



  $scope.next = function(){
    $scope.counter++;
  }




  //sets the counter to the index of the clicked anchor
  $scope.setCounter = function(index){
    $scope.counter = index;  


  };


  $scope.saveAnswer = function(choice, options){

    var correct = choice.correct;

    //Kollar om någon av frågorna har värdet true o sätter runOnce till true isf
    answerService.questionAnswered(options);

    if($rootScope.runOnce){
      var selected = false;
    }else{
      var selected = choice.selected = true;
    }
    
    //kollar ifall svar är rätt eller fel
    if(answerService.checkAnswer(correct, selected)){
      $scope.playerScore++;
    }

    //Kallar metoden next efter 2sek

    if(choice.selected){
      $timeout(function(){
        if(running === false){
          $scope.next();
          running = true;
        }  
      }, 2000);
    }
  };
  
  //adds value to a service so they can be displayed on the result screen
  var addPlayerScore = function(){
    dataService.setData($scope.playerScore);
    dataService.setLength(questionLength+1); 
  };

 

}]);


myApp.controller('dataCtrl', ['$scope','dataService', function($scope, dataService){

  $scope.playerScore = dataService.data;
  $scope.questionLength = dataService.length;

}]);