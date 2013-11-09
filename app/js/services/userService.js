appServices.factory('userService', ['FBURL', 'Firebase', 'angularFireAuth', '$timeout', '$q', '$rootScope', '$location', function (FBURL, Firebase, angularFireAuth, $timeout, $q, $rootScope, $location){
  var appRef = new Firebase(FBURL),
      login,
      logout,
      addUser,
      addRoster,
      getAvailability,
      addKudos,
      getKudos,
      _loginCallback,
      _emailToId;

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

  _emailToId = function(email){
    return email.replace('.', '*');
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
    $location.path("/");
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
        deferred = $q.defer(),
        _newUser = usersRef.child(_emailToId(userObj.email));

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

  addRoster = function(args){
    var userRostersRef,
        email = args.email,
        rosterId = args.roster,
        dates = args.dates,
        rosterRef;

    for(var date in dates){
      dates[date] = {
        date: args.dates[date].date,
        canAttend: true
      }
    }

    userRostersRef = appRef.child('users/'+_emailToId(email)+'/rosters');
    rosterRef = userRostersRef.child(rosterId);
    rosterRef.set(false);
    rosterRef.child('dates').set(dates);
  };

  getAvailability = function(args){
    var userRosterRef;

    userRosterRef = appRef.child('users/'+_emailToId(args.email)+'/rosters/'+args.rosterId+'/dates/'+args.date);
    userRosterRef.on('value', function(a){
      args.callback(a.val().canAttend);
    });
  }

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
    addUser: addUser,
    addRoster: addRoster,
    getAvailability: getAvailability
    // addKudos: addKudos
    // getKudos: getKudos
  };
}]);
