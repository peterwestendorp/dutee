'use strict';

appControllers.controller('rosterController', ['$scope', 'FBURL', 'Firebase', 'angularFire', 'userService', 'rosterService', '$timeout', '$routeParams', '$compile', function($scope, FBURL, Firebase, angularFire, userService, rosterService, $timeout, $routeParams, $compile){

  var dateCount = 1,
      dates = {};

  // add users from email input (comma separated)
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

  // add date selection input
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

  $scope.show = function(params){
    $scope.currentRosterId = params.id;

    rosterService.get($scope.currentRosterId, function(snapshot){
      $scope.roster = snapshot.val();

      $scope.rosterView = {
        dates: [],
        volunteers: {}
      };

      // per date in the roster...
      angular.forEach($scope.roster.dates, function(dateVal, dateName){

        // ...add date to dates array to show in <th>
        $scope.rosterView.dates.push(dateVal.date);

        // per user linked to the roster...
        angular.forEach($scope.roster.volunteers, function(email){

          // ...find out their availability on that date
          userService.getAvailability({
            email:email,
            rosterId: $scope.currentRosterId,
            date: dateName,
            callback: function(availability){
              if(!$scope.rosterView.volunteers.hasOwnProperty(email)){
                $scope.rosterView.volunteers[email] = {};
              }

              // add volunteer and date availability to rosterView object
              $scope.rosterView.volunteers[email][Date.parse(dateVal.date)] = {
                canAttend: availability,
                dateName: dateName,
                editable: (params.email == email)
              };

              if(!$scope.$$phase){
                $scope.$apply();
              }
            }
          });
        });

      });
    });
  };

  // update availability
  $scope.update = function(email, dateName, value){
    userService.updateAvailability({
      email:email,
      rosterId: $scope.currentRosterId,
      date: dateName,
      value: value
    });
  };

  if($routeParams.id){
    $scope.show($routeParams);
  }

}]);
