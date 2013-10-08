'use strict';

appControllers.controller('mainController', ['$scope', '$rootScope', 'userService', function($scope, $rootScope, userService){

    $scope.login = userService.login;
    $scope.logout = userService.logout;
    // $scope.addKudos = userService.addKudos;
    // $scope.getKudos = userService.getKudos;

}]);
