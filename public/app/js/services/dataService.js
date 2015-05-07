// handles data that are sent between controllers
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

