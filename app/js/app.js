'use strict';

var appDirectives = angular.module('duteeApp.directives', []),
    appControllers = angular.module('duteeApp.controllers', []),
    appServices = angular.module('duteeApp.services', []),
    appFilters = angular.module('duteeApp.filters', []);

// Declare app level module which depends on filters, and services
angular.module('duteeApp',
      ['duteeApp.config', 'duteeApp.filters', 'duteeApp.services', 'duteeApp.directives', 'duteeApp.controllers', 'firebase', 'ui.bootstrap', 'ngCookies', 'ngRoute']
   )

   // configure views; note the authRequired parameter for authenticated pages
   .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/', {
         templateUrl: 'partials/home.html'
      });

      $routeProvider.when('/roster/new', {
         templateUrl: 'partials/roster/new.html'
      });

      $routeProvider.when('/roster/:id/suggestion', {
         templateUrl: 'partials/suggestion/show.html'
      });

      $routeProvider.when('/roster/:id/:email', {
         templateUrl: 'partials/roster/edit.html'
      });

      $routeProvider.when('/roster/:id', {
         templateUrl: 'partials/roster/show.html'
      });

      $routeProvider.otherwise({redirectTo: '/'});
   }])

   // double-check that the app has been configured
   .run(['FBURL', function(FBURL) {
      if( FBURL === 'https://INSTANCE.firebaseio.com' ) {
         angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
      }
   }])

   // establish authentication
   .run(['angularFireAuth', 'FBURL', '$rootScope', '$location', function(angularFireAuth, FBURL, $rootScope, $location) {
      angularFireAuth.initialize(FBURL, {scope: $rootScope, name: "auth", path: '/login'});
      $rootScope.FBURL = FBURL;

      // redirect to homepage if not logged in
      $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        if(!$rootScope.isLoggedIn){
          $location.path("/");
        }
      });

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
