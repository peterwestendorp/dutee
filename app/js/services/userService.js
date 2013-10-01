'use strict';

appServices.factory('userService', ['FBURL', 'Firebase', '$timeout', function (FBURL, Firebase, $timeout) {
  var appRef = new Firebase(FBURL),
      loginCallback,
      login,
      logout,
      isLoggedIn,
      addKudos,
      getKudos,
      _auth,
      _loggedIn = false,
      _fbUser;

  loginCallback = function(error, user){
    if(error){
      console.error("loginCallback error:", error);
    }
    else if(user){
      var usersRef = appRef.child('users');

      _fbUser = usersRef.child(user.id);

      // user transaction
      _fbUser.transaction(function(currentData){
        if(currentData === null){
          return {
            facebook_uid: user.id,
            email: user.email,
            first_name: user.first_name || null,
            last_name: user.last_name || null,
            timezone: user.timezone || null
          };
        }
        else {
          return;
        }
      }, function(error, committed, snapshot){
        if(error){
          console.error('User transaction failed abnormally!', error);
        }
        else if(!committed){
          console.log('User already exists');
        }

        // let angular digest new logged in state
        $timeout(function(){
          console.log('user logged in:', snapshot.val());
          _loggedIn = true;
        });
      });
    }
    else {
      // user is logged out
      _loggedIn = false;
    }
  };

  _auth = new FirebaseSimpleLogin(appRef, loginCallback);

  login = function(){
    _auth.login('facebook', {
      rememberMe: true,
      scope: 'email'
    });
  };

  logout = function(){
    _auth.logout();
  };

  isLoggedIn = function(){
    return _loggedIn;
  };

  addKudos = function(added){
    if(!isLoggedIn()){return;}

    _fbUser.child('kudos').transaction(function(kudos){
      return kudos+added;
    }, function(error){
      if(error){
        console.error("Adding kudos failed");
      }
    });
  };

  // getKudos = function(){
  //   console.log(_fbUser.kudos);
  // };

  return {
    login: login,
    logout: logout,
    isLoggedIn: isLoggedIn,
    addKudos: addKudos
    // getKudos: getKudos
  };
}]);
