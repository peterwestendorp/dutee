'use strict';

/* jasmine specs for services go here */
describe('service', function() {
   beforeEach(module('duteeApp.services'));

   beforeEach(module(function($provide) {
      $provide.value('Firebase', firebaseStub());
      $provide.value('$location', stub('path'));
      $provide.value('FBURL', 'FAKE_FB_URL');
      $provide.value('angularFireAuth', angularAuthStub());
   }));

   describe('userService', function() {
      describe('#login', function() {
          it('should invoke angularFireAuth.login with correct arguments',
            inject(function(userService, angularFireAuth){
              userService.login();
              expect(angularFireAuth.login).toHaveBeenCalledWith('facebook', {
                rememberMe: true,
                scope: 'email'
              });
            })
          );
      });

      describe('#logout', function() {
         it('should invoke angularFireAuth.logout()', function() {
            inject(function(userService, angularFireAuth) {
               userService.logout();
               expect(angularFireAuth.logout).toHaveBeenCalled();
            });
         });

         it('should invoke redirect after calling logout', function() {
            inject(function(userService, angularFireAuth, $location) {
               userService.logout();
               expect($location.path).toHaveBeenCalledWith('/');
            });
         });
      });

   });

   function stub() {
      var out = {};
      angular.forEach(arguments, function(m) {
         out[m] = jasmine.createSpy();
      });
      return out;
   }

   function reject($q, error) {
      var def = $q.defer();
      def.reject(error);
      return def.promise;
   }

   function resolve($q, val) {
      var def = $q.defer();
      def.resolve(val);
      return def.promise;
   }

   function firebaseStub() {
      // firebase is invoked using new Firebase, but we need a static ref
      // to the functions before it is instantiated, so we cheat here by
      // attaching the functions as Firebase.fns, and ignore new (we don't use `this` or `prototype`)
      var fns = stub('set');
      customSpy(fns, 'child', function() { return fns; });

      var Firebase = function() {
         angular.extend(this, fns);
         return fns;
      };
      Firebase.fns = fns;

      return Firebase;
   }

   function angularAuthStub() {
      var auth = stub('login', 'logout', 'createAccount', 'changePassword', 'initialize');
      auth._authClient = stub('changePassword', 'createUser');
      return auth;
   }

   function customSpy(obj, m, fn) {
      obj[m] = fn;
      spyOn(obj, m).andCallThrough();
   }

   function ErrorWithCode(code, msg) {
      this.code = code;
      this.msg = msg;
   }
   ErrorWithCode.prototype.toString = function() { return this.msg; }
});
