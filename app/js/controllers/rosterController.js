'use strict';

appControllers.controller('rosterController', ['$scope', 'FBURL', 'Firebase', 'angularFire', 'userService', 'rosterService', '$timeout', function($scope, FBURL, Firebase, angularFire, userService, rosterService, $timeout){

  $scope.addUsers = function(){
    var newUsers = $scope.newUsers.replace(" ", "").split(',');

    for(var i = 0; i < newUsers.length; i++){
      userService.addUser({
        email: newUsers[i]
      }).then(function(){
        $scope.newUsers = "";
      });
    }

    return newUsers;
  };

  $scope.createRoster = function(){
    rosterService.create({
      date: $scope.date,
      volunteers: $scope.addUsers()
    }).then(function(){
      console.log("Roster added/updated successfully...");
    });
  };

}]);
