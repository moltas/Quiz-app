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