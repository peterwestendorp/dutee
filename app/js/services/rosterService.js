appServices.factory('rosterService', ['FBURL', 'Firebase', '$timeout', '$q', '$rootScope', '$location',function (FBURL, Firebase, $timeout, $q, $rootScope, $location){
  var appRef = new Firebase(FBURL),
      rostersRef = appRef.child('rosters'),
      _create;

  _create = function(args){
    var _newRoster = rostersRef.push();

    _newRoster.set({
      date: args.date.toUTCString(),
      volunteers: args.volunteers
    });

    return _newRoster.name();
  };


  return {
    create: _create
  };
}]);
