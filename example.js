"use strict";
var h_1 = require("./h");
var my_vdom_1 = require("./my-vdom");
var exampleContent = 'hello world';
var exampleVNode = h_1.h('div', {
    onclick: function () {
        exampleContent += '!';
        console.log('klik');
    }
}, function () { return exampleContent; });
my_vdom_1.myVDOM.add(exampleVNode);
my_vdom_1.myVDOM.append(document.getElementById('app'));
//# sourceMappingURL=example.js.map