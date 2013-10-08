appServices.factory('userService', ['FBURL', 'Firebase', '$timeout', '$q', '$rootScope',function (FBURL, Firebase, $timeout, $q, $rootScope){
  var appRef = new Firebase(FBURL),
      login,
      logout,
      isLoggedIn,
      addUser,
      addKudos,
      getKudos,
      _user,
      _loginCallback,
      _auth,
      _loggedIn = false

  _loginCallback = function(error, user){
    if(error){
      console.error("loginCallback error:", error);
    }
    else if(user){
      addUser({
        facebook_uid: user.id,
        email: user.email,
        first_name: user.first_name || null,
        last_name: user.last_name || null,
        timezone: user.timezone || null
      }).then(function(){
        // let angular digest new logged in state
        $timeout(function(){
          console.log('User logged in successfully');
          _loggedIn = true;
        });
      });
    }
    else {
      // user is logged out
      _loggedIn = false;
    }
  };

  _auth = new FirebaseSimpleLogin(appRef, _loginCallback);

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

  $rootScope.isLoggedIn = isLoggedIn;

  addUser = function(userObj){
    // Example userObj:
    //
    // {
    //   facebook_uid: 99,
    //   email: "foo@bar.com",  (required)
    //   first_name: "foo",
    //   last_name: "bar",
    //   timezone: 1
    // }

    var usersRef = appRef.child('users'),
        deferred = $q.defer();

    _user = usersRef.child(userObj.email.replace('.', '*'));

    // user transaction
    _user.transaction(function(currentData){
      if(currentData === null){ return userObj; }
      else { return; }
      deferred.resolve('User created');
    }, function(error, committed, snapshot){
      if(error){
        deferred.reject('User transaction failed abnormally! '+error);
      }
      else if(!committed){
        deferred.resolve('User already exists');
      }
    });

    return deferred.promise;
  };

  addKudos = function(added){
    if(!isLoggedIn()){return;}

    _user.child('kudos').transaction(function(kudos){
      return kudos+added;
    }, function(error){
      if(error){
        console.error("Adding kudos failed");
      }
    });
  };

  // getKudos = function(){
  //   console.log(_user.kudos);
  // };

  return {
    login: login,
    logout: logout,
    isLoggedIn: isLoggedIn,
    addUser: addUser,
    addKudos: addKudos
    // getKudos: getKudos
  };
}]);
