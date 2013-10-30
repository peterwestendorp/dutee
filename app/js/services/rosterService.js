appServices.factory('rosterService', ['FBURL', 'Firebase', '$timeout', '$q', '$rootScope', '$location',function (FBURL, Firebase, $timeout, $q, $rootScope, $location){
  var appRef = new Firebase(FBURL),
      rostersRef = appRef.child('rosters'),
      create,
      get;

  create = function(args){
    var _newRoster = rostersRef.push();

    _newRoster.set({
      date: args.date.toUTCString(),
      volunteers: args.volunteers
    });

    return _newRoster.name();
  };

  get = function(id, callback){
    rostersRef.child(id).on('value', callback);
  };

  return {
    create: create,
    get: get
  };
}]);
