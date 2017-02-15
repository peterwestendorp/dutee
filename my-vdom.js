"use strict";
var element;
var vNode;
exports.myVDOM = {
    add: function (vnode) {
        vNode = vnode;
    },
    append: function (rootElement) {
        if (vNode) {
            element = document.createElement(vNode.selector);
            element.addEventListener('click', vNode.properties.onclick);
            element.innerText = vNode.getContent();
        }
        rootElement.appendChild(element);
    },
    render: function () {
        // element.innerText = vdom.getContent();
        // console.log('rendering VDOM', vdom);
    }
};
//# sourceMappingURL=my-vdom.js.map