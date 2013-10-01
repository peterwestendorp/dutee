'use strict';

appControllers.controller('mainController', ['$scope', '$rootScope', 'userService', function($scope, $rootScope, userService){

    $scope.login = userService.login;
    $scope.logout = userService.logout;
    $rootScope.isLoggedIn = userService.isLoggedIn;
    $scope.addKudos = userService.addKudos;
    // $scope.getKudos = userService.getKudos;

}]);
