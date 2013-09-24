'use strict';

appControllers.controller('mainController', ['$scope', '$rootScope', 'facebookAuthService', function($scope, $rootScope, facebookAuthService){

    $scope.login = facebookAuthService.login;
    $scope.logout = facebookAuthService.logout;
    $rootScope.isLoggedIn = facebookAuthService.isLoggedIn;

}]);
