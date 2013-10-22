'use strict';

appControllers.controller('rosterController', ['$scope', 'FBURL', 'Firebase', 'angularFire', 'userService', '$timeout', function($scope, FBURL, Firebase, angularFire, userService, $timeout){

  $scope.addUsers = function(){
    var newUsers = $scope.newUsers.replace(" ", "").split(',');

    for(var i = 0; i < newUsers.length; i++){
      userService.addUser({
        email: newUsers[i]
      }).then(function(){
        $scope.newUsers = "";
      });
    }
  };

  $scope.createRoster = function(){
    $scope.addUsers();
    console.log($scope.date);
  };

}]);
