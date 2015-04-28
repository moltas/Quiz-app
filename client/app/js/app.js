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
  'ngResource',
  'ngRoute',
  'ngAnimate'
]);

  //Routes
myApp.config(function ($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'partials/questions.html',
      controller: 'MainCtrl'
    })
    .when('/about', {
      templateUrl: 'partials/about.html'
    })
    .when('/result_page', {
      templateUrl: 'partials/result_page.html',
      controller: 'dataCtrl'
    })
    .when('/createquestion', {
      templateUrl: 'partials/createQuestion.html',
      controller: 'CreateQuestionCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
