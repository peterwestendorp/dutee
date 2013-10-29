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
    var users = $scope.addUsers(),
        rosterId;

    rosterId = rosterService.create({
      date: $scope.date,
      volunteers: users
    });

    for(var i = 0; i < users.length; i++){
      userService.addRoster({
        email: users[i],
        roster: rosterId
      });
    }

  };

}]);
