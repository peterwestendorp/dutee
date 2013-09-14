'use strict';

appControllers.controller('FacebookLogin', ['$scope', 'FBURL', 'Firebase', function($scope, FBURL, Firebase){
  var ref = new Firebase(FBURL);
  var auth = new FirebaseSimpleLogin(ref, function(error, user) {
    if (error) {
      // an error occurred while attempting login
      console.log(error);
    } else if (user) {
      // user authenticated with Firebase
      console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
    } else {
      // user is logged out
    }
  });

  $("#facebook-login").on('click', function(){
    auth.login('facebook');
  });
}]);
