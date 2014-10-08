'use strict';


// Declare app level module which depends on filters, and services
angular.module('GuessTheWord', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/game', {templateUrl: 'partials/game.html', controller: 'GameCtrl'});
  $routeProvider.when('/scores', {templateUrl: 'partials/scores.html', controller: 'ScoresCtrl'});
  $routeProvider.otherwise({redirectTo: '/game'});
}]);
