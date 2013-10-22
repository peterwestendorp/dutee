appServices.factory('rosterService', ['FBURL', 'Firebase', '$timeout', '$q', '$rootScope', '$location',function (FBURL, Firebase, $timeout, $q, $rootScope, $location){
  var appRef = new Firebase(FBURL),
      rostersRef = appRef.child('rosters'),
      _create;

  _create = function(args){
    var deferred = $q.defer(),
        _newRoster = rostersRef.child("486548765437856");

    _newRoster.transaction(function(currentData){
      if(currentData === null){
        return {
          date: args.date,
          volunteers: args.volunteers
        };
      }
      else { return; }
      deferred.resolve('Roster created');
    }, function(error, committed, snapshot){
      if(error){
        deferred.reject('Roster transaction failed abnormally! '+error);
      }
      else if(!committed){
        deferred.resolve('Roster already exists');
      }
    });

    return deferred.promise;
  };


  return {
    create: _create
  };
}]);
