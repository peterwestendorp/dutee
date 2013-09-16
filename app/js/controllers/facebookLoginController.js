'use strict';

appControllers.controller('FacebookLoginController', ['$scope', 'FBURL', 'Firebase', '$timeout', function($scope, FBURL, Firebase, $timeout){
    var appRef = new Firebase(FBURL);

    $scope.loggedIn = false;

    $scope.auth = new FirebaseSimpleLogin(appRef, function(error, user){
      if(error){
        console.log(error);
      }
      else if(user){
        var usersRef = appRef.child('users'),
            fbUser = usersRef.child(user.id),

            first_name = user.first_name || null,
            last_name = user.last_name || null,
            timezone = user.timezone || null;

        fbUser.set({ facebook_uid: user.id, email: user.email, first_name: first_name, last_name: last_name, timezone: user.timezone });

        $timeout(function(){
          $scope.loggedIn = true;
        });
      }
      else {
        $scope.loggedIn = false;
        // user is logged out
      }
    });

    $scope.login = function(){
      $scope.auth.login('facebook', {
        rememberMe: true,
        scope: 'email'
      });
    };

    $scope.logout = function(){
      $scope.auth.logout();
    };

    $scope.isLoggedIn = function(){
      return $scope.loggedIn;
    };
}]);
