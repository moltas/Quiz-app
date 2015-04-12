'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('MainCtrl', function ($scope, $location) {


    $scope.changeView = function(view){
    	$location.path(view);
    }

    $scope.counter = 0;
    $scope.answer = 0;

    $scope.next = function(){

    	if( $scope.counter < $scope.questions.length-1){
    		$scope.counter++;
    		$scope.answer = 0;
    	}else{
    		//set last question to true here
    	}
    }

    $scope.previous = function(){
    	if( $scope.counter > 0){
    		$scope.counter--;
    	}else{
    		//set first question to true here
    	}
    }

    $scope.sayHello = function(){
        $scope.counter = 1;
        alert($scope.counter);
    }




    $scope.saveAnswer = function(id){
    	$scope.answer = id;
    }
    
    $scope.checkAnswer = function(){

    	var id = $scope.answer - 1;
        // var box = document.getElementById(id);

    	if(id > 0){
    		var correct = $scope.questions[$scope.counter].answers[id].correct;
    	}else{
    		var correct = null;
    	}
    	

    	if(correct == true){
    		alert("Right answer");
    	}else{
    		console.log($scope.questions[$scope.counter].answers[id]);
    	}
    	$scope.next();

    }


    //temp objects of questions, will later be JSON

    $scope.questions = [
 			{
 				image: "../images/yeoman.png",
    		question: "Vad är världsrekordet i höjdhopp?",
    		answers: [
    			{alternative: "1.10m", correct: false, id: 1},
    			{alternative: "2.10m", correct: false, id: 2},
    			{alternative: "2.20m", correct: true,  id: 3},
    			{alternative: "2.35m", correct: false, id: 4}
    		]
    	},
			{
				image: "../images/H.M.jpg",
    		question: "Vad heter Sveriges konung?",
    		answers: [
    			{alternative: "Gustaf", correct: true, id: 1},
    			{alternative: "Gösta", correct: false, id: 2},
    			{alternative: "Kalle", correct: false, id: 3},
    			{alternative: "Adolf", correct: false, id: 4}
    		]
    	},
			{
				image: "../images/H.M.jpg",
    		question: "Hur många guld tog Karolina Kluft i OS 98?",
    		answers: [
    			{alternative: "2", correct: true, id: 1},
    			{alternative: "1", correct: false, id: 2},
    			{alternative: "Inget", correct: false, id: 3},
    			{alternative: "5", correct: false, id: 4}
    		]
    	}
    ]



  });
