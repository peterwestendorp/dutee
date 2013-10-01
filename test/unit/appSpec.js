'use strict';

/* verify config settings are present */

describe('service', function() {
   beforeEach(
    module('duteeApp')
   );

   // it('should be configured (FBURL was set)', inject(function(FBURL) {
   //    expect(FBURL).not.toEqual('https://INSTANCE.firebaseio.com');
   // }));
});

var myModule = angular.module('duteeApp'),
    runBlock = myModule._runBlocks[1];

console.log(runBlock)
