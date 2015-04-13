'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('MainCtrl', [ '$scope', '$location', function ($scope, $location) {


    $scope.changeView = function(view){
    	$location.path(view);
    };

    $scope.counter = 0;
    $scope.answer = 0;
    $scope.redOrGreen = '';

    $scope.next = function(){

    	if( $scope.counter < $scope.questions.length-1){
    		$scope.counter++;
    		$scope.answer = 0;
    	}else{
    		//set last question to true here
    	}
    };

    $scope.previous = function(){
    	if( $scope.counter > 0){
    		$scope.counter--;
    	}else{
    		//set first question to true here
    	}
    };


    $scope.setCounter = function(index){
      $scope.counter = index;
    }


    //This method runs when the radio inputs are changed, 
    //  $scope.updateOptions = function(choices, choice){
    //   for(var i=0; i<choices.length; i++){
    //     //loops through choices and sets selected to true if id:s match
    //     choices[i].selected = choices[i].id===choice.id;
    //     console.log(choices[i].selected);
    //     console.log("choices[i].id = " + choices[i].id + " choice.id = " + choice.id);
    //   }
    // };



    $scope.saveAnswer = function(id){
    	$scope.answer = id -1 ;

      $scope.checkAnswer($scope.answer);

    };
    
    $scope.checkAnswer = function(id){

      var correct = $scope.questions[$scope.counter].choices[id].correct;
      var selected = $scope.questions[$scope.counter].choices[id].selected = true;
      console.log($scope.questions[$scope.counter].choices[id].correct);



      if(correct && selected){
        $scope.redOrGreen = 'green';
      }else{
        $scope.redOrGreen = 'red';
      }

    };


    //temp objects of questions, will later be JSON

    $scope.questions = [
 			{
        image: 'http://www.svt.se/oppet-arkiv-pub/cachable_image/1365678145000/b/article1146709.svt/ALTERNATES/extralarge/bjorne1920.jpg',
    		question: 'Vad heter björnen?',
    		choices: [
          {id: 1, text: 'Bamse', correct: false,  selected: false},
          {id: 2, text: 'Brumse', correct: false, selected: false},
          {id: 3, text: 'Björne', correct: true, selected: false},
          {id: 4, text: 'Nalle', correct: false, selected: false}
    		]
    	},
			{
        image: 'http://www.tommyfotografen.se/wp-content/uploads/2010/04/fakta01.jpg',
    		question: 'Vad heter Sveriges största sjö?',
    		choices: [
          {id: 1, text: 'Vättern', correct: false,  selected: false},
          {id: 2, text: 'Mälaren', correct: false, selected: false},
          {id: 3, text: 'Skagern', correct: false, selected: false},
          {id: 4, text: 'Vänern', correct: true, selected: false}
    		]
    	},
      {
        image: '../images/H.M.jpg',
        question: 'Vad heter Sveriges konung?',
        choices: [
          {id: 1, text: 'Carl XVI Gustaf', correct: true,  selected: false},
          {id: 2, text: 'Karl XVI Gustaf', correct: false, selected: false},
          {id: 3, text: 'Gustaf II Adolf', correct: false, selected: false},
          {id: 4, text: 'Carl Phillip', correct: false, selected: false}
        ]
      },
      {
        image: 'http://www.bbu.se/wp-content/uploads/2013/08/kraftor.jpg',
        question: 'Vilken månad har man "kräftskiva"',
        choices: [
          {id: 1, text: 'Maj', correct: false,  selected: false},
          {id: 2, text: 'Augusti', correct: true, selected: false},
          {id: 3, text: 'Juli', correct: false, selected: false},
          {id: 4, text: 'Oktober', correct: false, selected: false}
        ]
      }
    ];




  }]);
