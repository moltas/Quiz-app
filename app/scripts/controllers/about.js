'use strict';

/**
 * @ngdoc function
 * @name angularappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularappApp
 */
angular.module('angularappApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
