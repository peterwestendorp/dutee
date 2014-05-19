'use strict';

appControllers.controller('suggestionController', ['$scope', 'FBURL', 'Firebase', 'angularFire', 'userService', 'rosterService', 'suggestionService', '$timeout', '$routeParams', '$compile', function($scope, FBURL, Firebase, angularFire, userService, rosterService, suggestionService, $timeout, $routeParams, $compile){

  $scope.show = function(params){
    $scope.currentRosterId = params.id;

    rosterService.get($scope.currentRosterId, function(snapshot){
      $scope.roster = snapshot.val();

      $scope.suggestion = {
        dates: {}
      };

      // per date in the roster...
      angular.forEach($scope.roster.dates, function(dateVal, dateName){

        // ...add date to suggestion object to show in <th>
        $scope.suggestion.dates[Date.parse(dateVal.date)] = {};

        // per user linked to the roster...
        angular.forEach($scope.roster.volunteers, function(email){

          // ...find out their availability on that date
          userService.getAvailability({
            email:email,
            rosterId: $scope.currentRosterId,
            date: dateName,
            callback: function(available){
              if(available && !$scope.suggestion.dates[Date.parse(dateVal.date)].length){
                $scope.suggestion.dates[Date.parse(dateVal.date)]['email'] = email;

                if(!$scope.$$phase){
                  $scope.$apply();
                }

                suggestionService.create({
                  id: $scope.currentRosterId,
                  suggestions: $scope.suggestion
                });
              }
            }
          });
        });

      });
    });

    console.log("suggestionController", $routeParams);
  };

  // if($routeParams.id){
  $scope.show($routeParams);
  // }

}]);
