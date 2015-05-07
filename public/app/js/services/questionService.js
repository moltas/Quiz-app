// handles http requests for services using the $http object
myApp.factory('questionService', ['$http', function($http){

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