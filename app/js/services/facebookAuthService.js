'use strict';

appServices.factory('facebookAuthService', ['FBURL', 'Firebase', '$timeout', function(FBURL, Firebase, $timeout) {
  var _appRef = new Firebase(FBURL),
      _loggedIn = false,
      _auth,
      _login,
      _logout,
      _isLoggedIn;

  _auth = new FirebaseSimpleLogin(_appRef, function(error, user){
    if(error){
      console.log(error);
    }
    else if(user){
      var usersRef = _appRef.child('users'),
          fbUser = usersRef.child(user.id),

          first_name = user.first_name || null,
          last_name = user.last_name || null,
          timezone = user.timezone || null;

      fbUser.set({ facebook_uid: user.id, email: user.email, first_name: first_name, last_name: last_name, timezone: user.timezone });

      $timeout(function(){
        _loggedIn = true;
      });
    }
    else {
      _loggedIn = false;
      // user is logged out
    }
  });

  _login = function(){
    _auth.login('facebook', {
      rememberMe: true,
      scope: 'email'
    });
  };

  _logout = function(){
    _auth.logout();
  };

  _isLoggedIn = function(){
    return _loggedIn;
  };

  return {
    appRef: _appRef,
    loggedIn: _loggedIn,
    auth: _auth,
    login: _login,
    logout: _logout,
    isLoggedIn: _isLoggedIn
  };
}]);
