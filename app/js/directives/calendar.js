'use strict';

appDirectives.directive('calendar', ['$timeout', function($timeout) {
  return {
    templateUrl: 'partials/directives/calendar.html',
    replace: true,
    restrict: 'A',
    scope: true,
    controller: function($scope, $element, $attrs, $transclude){

      $scope.today = function() {
        $scope.date = new Date();
      };
      $scope.today();

      $scope.clear = function () {
        $scope.date = null;
      };

      // $scope.showWeeks = true;
      // $scope.toggleWeeks = function () {
      //   $scope.showWeeks = ! $scope.showWeeks;
      // };
      // // Disable weekend selection
      // $scope.disabled = function(date, mode) {
      //   return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
      // };

      // $scope.toggleMin = function() {
      //   $scope.minDate = ( $scope.minDate ) ? null : new Date();
      // };
      // $scope.toggleMin();

      $scope.openCalendar = function() {
        $timeout(function() {
          $scope.calendarOpened = true;
        });
      };

      $scope.$watch('date', function(newVal, oldVal){
        $scope.$emit('dateAdded', {
          dateName: $attrs.calendar,
          dateValue: $scope.date
        });
      });



    }
  };
}]);
