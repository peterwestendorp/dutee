'use strict';

appControllers.controller('MyCtrl1', ['$scope', 'FBURL', 'angularFire', function($scope, FBURL, angularFire) {
  angularFire(FBURL+'/syncedValue', $scope, 'syncedValue', '');
}]);
