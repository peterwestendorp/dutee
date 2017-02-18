"use strict";
var h_1 = require("./h");
var my_vdom_1 = require("./my-vdom");
var exampleContent = 'hallo wereld';
var exampleVNode = h_1.h('div', {
    onclick: function () {
        exampleContent += '!';
        console.log('klik');
        my_vdom_1.myVDOM.render();
    }
}, function () { return exampleContent; });
my_vdom_1.myVDOM.add(exampleVNode);
my_vdom_1.myVDOM.append(document.getElementById('app'));
//# sourceMappingURL=example.js.map