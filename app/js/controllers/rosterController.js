'use strict';

appControllers.controller('rosterController', ['$scope', 'FBURL', 'Firebase', 'angularFireCollection', function($scope, FBURL, Firebase, angularFireCollection) {
  $scope.newMessage = null;

  // constrain number of messages by passing a ref to angularFire
  var ref = new Firebase(FBURL+'/messages').limit(10);
  // add the array into $scope
  $scope.messages = angularFireCollection(ref);

  // add new messages to the list
  $scope.addMessage = function() {
     if( $scope.newMessage ) {
        $scope.messages.add({text: $scope.newMessage});
        $scope.newMessage = null;
     }
  };
}]);
