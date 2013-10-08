appServices.factory('userService', ['FBURL', 'Firebase', 'angularFireAuth', '$timeout', '$q', '$rootScope',function (FBURL, Firebase, angularFireAuth, $timeout, $q, $rootScope){
  var appRef = new Firebase(FBURL),
      login,
      logout,
      addUser,
      addKudos,
      getKudos,
      _loginCallback;

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
        console.log("User added/updated successfully...");
      });
    }
  };

  angularFireAuth.initialize(FBURL, {
    scope: $rootScope,
    name: "isLoggedIn",
    callback: _loginCallback
  });

  login = function(){
    angularFireAuth.login('facebook', {
      rememberMe: true,
      scope: 'email'
    });
  };

  logout = function(){
    angularFireAuth.logout();
  };

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
        deferred = $q.defer()
        _newUser = usersRef.child(userObj.email.replace('.', '*'));

    // user transaction
    _newUser.transaction(function(currentData){
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

  // addKudos = function(added){
  //   if(!$rootScope.user){return;}

  //   _newUser.child('kudos').transaction(function(kudos){
  //     return kudos+added;
  //   }, function(error){
  //     if(error){
  //       console.error("Adding kudos failed");
  //     }
  //   });
  // };

  // getKudos = function(){
  //   console.log(_newUser.kudos);
  // };

  return {
    login: login,
    logout: logout,
    addUser: addUser
    // addKudos: addKudos
    // getKudos: getKudos
  };
}]);
