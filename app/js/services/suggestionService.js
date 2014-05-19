appServices.factory('suggestionService', ['FBURL', 'Firebase', '$timeout', '$q',
  '$rootScope', '$location',function (FBURL, Firebase, $timeout, $q,
    $rootScope, $location){
  var appRef = new Firebase(FBURL),
      suggestionsRef = appRef.child('suggestions'),
      rostersRef = appRef.child('rosters'),
      usersRef = appRef.child('users'),
      create,
      get;

  create = function(args){
    var _newSuggestion = suggestionsRef.child(args.id);

    console.log(args);
    // _newSuggestion.set({
      // dates: dates,
    //   volunteers: args.volunteers
    // });

    return _newSuggestion;
  };

  get = function(id, callback){
    suggestionsRef.child(id).on('value', callback);
  };

  return {
    create: create,
    get: get
  };
}]);
