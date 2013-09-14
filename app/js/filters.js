'use strict';

/* Filters */
appFilters.filter('interpolate', ['version', function(version) {
  return function(text) {
     return String(text).replace(/\%VERSION\%/mg, version);
  }
}]);

appFilters.filter('reverse', function() {
  return function(items) {
     return items.slice().reverse();
  };
});
