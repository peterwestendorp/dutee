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

   describe('userService', function(){
      var appRef;

      describe('#login', function(){
        it('should call angularFireAuth.login with correct arguments',
          inject(function(userService, angularFireAuth) {
            userService.login();

            expect(angularFireAuth.login).toHaveBeenCalledWith('facebook', {
              rememberMe: true,
              scope: 'email'
            });
          })
        );
      });

      describe('#logout', function(){
        it('should invoke angularFireAuth.logout()', function() {
          inject(function(userService, angularFireAuth, $location){
            userService.logout();
            expect(angularFireAuth.logout).toHaveBeenCalled();
          });
        });

        it('should invoke redirect after calling logout', function() {
          inject(function(userService, $location){
            userService.logout();
            expect($location.path).toHaveBeenCalledWith('/');
          });
        });
      });

      // describe('#addUser', function(){
      //   it('should open a transaction for the new user and return a promise', function(){
      //     inject(function(userService){

      //       var refs = userService.addUser({
      //         facebook_uid: 99,
      //         email: "foo@bar.com",
      //         first_name: "foo",
      //         last_name: "bar",
      //         timezone: 1
      //       }).refs;

      //       expect(refs.usersRef.child).toHaveBeenCalledWith('foo@bar*com');
      //     });

      //   });
      // });

      describe('#addRoster', function(){

        it('should call Firebase with the right arguments', function(){
          inject(function(userService, Firebase, FBURL){
            var addRosterArgs = {
              email: "foo@bar.com",
              roster: "-JDaf5Z8tWcmgDMIbSQk",
              dates: {
                "date-1": {
                  date: "Sat, 18 Jan 2014 18:45:42 GMT"
                },
                "date-2": {
                  date: "Sun, 19 Jan 2014 18:45:49 GMT"
                }
              }
            },
            refs = userService.addRoster(addRosterArgs);

            expect(refs.appRef.child).toHaveBeenCalledWith('users/foo@bar*com/rosters');
            expect(refs.userRostersRef.child).toHaveBeenCalledWith('-JDaf5Z8tWcmgDMIbSQk');
            expect(refs.rosterRef.set).toHaveBeenCalledWith(false);
          });
        });

      });

      // describe('#getAvailability', function(){});

      // describe('#updateAvailability', function(){});

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
