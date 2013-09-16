'use strict';

// Declare app level module which depends on filters, and services
angular.module('duteeApp',
      ['duteeApp.config', 'duteeApp.filters', 'duteeApp.services', 'duteeApp.directives', 'duteeApp.controllers', 'firebase']
   )

   // configure views; note the authRequired parameter for authenticated pages
   .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/view1', {
         templateUrl: 'partials/view1.html',
         controller: 'MyCtrl1'
      });

      $routeProvider.when('/view2', {
         templateUrl: 'partials/view2.html',
         controller: 'MyCtrl2'
      });

      $routeProvider.otherwise({redirectTo: '/view1'});
   }])

   // double-check that the app has been configured
   .run(['FBURL', function(FBURL) {
      if( FBURL === 'https://INSTANCE.firebaseio.com' ) {
         angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
      }
   }])

   // establish authentication
   .run(['angularFireAuth', 'FBURL', '$rootScope', function(angularFireAuth, FBURL, $rootScope) {
      angularFireAuth.initialize(FBURL, {scope: $rootScope, name: "auth", path: '/login'});
      $rootScope.FBURL = FBURL;
   }]);

   // .run(['$rootScope', function($rootScope){
   //    $rootScope.safeApply = function(fn) {
   //      var phase = this.$root.$$phase;
   //      if(phase == '$apply' || phase == '$digest') {
   //        if(fn && (typeof(fn) === 'function')) {
   //          fn();
   //        }
   //      } else {
   //        this.$apply(fn);
   //      }
   //    };
   // }]);

var appDirectives = angular.module('duteeApp.directives', []),
    appControllers = angular.module('duteeApp.controllers', []),
    appServices = angular.module('duteeApp.services', []),
    appFilters = angular.module('duteeApp.filters', []);
