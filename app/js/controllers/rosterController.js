'use strict';

appControllers.controller('rosterController', ['$scope', 'FBURL', 'Firebase', 'angularFire', 'userService', 'rosterService', '$timeout', '$routeParams', '$compile', function($scope, FBURL, Firebase, angularFire, userService, rosterService, $timeout, $routeParams, $compile){

  var dateCount = 1,
      dates = {};

  $scope.addUsers = function(){
    var newUsers = $scope.newUsers.replace(" ", "").split(','),
        i;

    for(i = 0; i < newUsers.length; i++){
      userService.addUser({
        email: newUsers[i]
      }).then(function(){
        $scope.newUsers = "";
      });
    }

    return newUsers;
  };

  $scope.$on('dateAdded', function(e, data){
    dates[data.dateName] = data.dateValue.toUTCString();
  });

  $scope.addDate = function(){
    var element;

    dateCount++;
    element = $compile("<div calendar='date-"+dateCount+"'></div>")($scope);
    $('*[calendar]').parent().append(element);
  };

  $scope.create = function(){
    var users = $scope.addUsers(),
        rosterId,
        i;

    rosterId = rosterService.create({
      dates: dates,
      volunteers: users
    });

    for(i = 0; i < users.length; i++){
      userService.addRoster({
        email: users[i],
        roster: rosterId,
        dates: dates
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
