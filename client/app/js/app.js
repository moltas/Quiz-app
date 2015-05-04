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
myApp.config(function ($routeProvider) {

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
});
