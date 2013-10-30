'use strict';

appControllers.controller('rosterController', ['$scope', 'FBURL', 'Firebase', 'angularFire', 'userService', 'rosterService', '$timeout', '$routeParams', function($scope, FBURL, Firebase, angularFire, userService, rosterService, $timeout, $routeParams){

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

  $scope.create = function(){
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

  $scope.show = function(id){
    rosterService.get(id, function(snapshot){
      $scope.roster = snapshot.val();

      $scope.volunteers = [];

      angular.forEach($scope.roster.volunteers, function(email){
        userService.getAvailability({
          email:email,
          rosterId: id,
          callback: function(available){
            $scope.volunteers.push({
              email:email,
              canAttend: available.val()
            });

            $scope.$apply();
          }
        });
      });

      $scope.$apply();
     });
  };

  if($routeParams.id){
    $scope.show($routeParams.id);
  }

}]);
