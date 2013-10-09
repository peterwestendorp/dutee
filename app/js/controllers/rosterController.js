'use strict';

appControllers.controller('rosterController', ['$scope', 'FBURL', 'Firebase', 'angularFire', 'userService', function($scope, FBURL, Firebase, angularFire, userService){

  $scope.addUsers = function(){
    userService.addUser({
      email: $scope.newUser
    }).then(function(){
      $scope.newUser = "";
    });
  };

}]);
