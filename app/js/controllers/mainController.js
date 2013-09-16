'use strict';

appControllers.controller('mainController', ['$scope', 'facebookAuthService', function($scope, facebookAuthService){
    console.log(facebookAuthService);

    $scope.login = facebookAuthService.login;
    $scope.logout = facebookAuthService.logout;
    $scope.isLoggedIn = facebookAuthService.isLoggedIn;
}]);
