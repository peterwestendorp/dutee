"use strict";
var element;
var vNode;
exports.myVDOM = {
    add: function (vnode) {
        vNode = vnode;
        // create DOM element
    },
    append: function (rootElement) {
        if (vNode) {
            element = document.createElement(vNode.selector);
            element.addEventListener('click', vNode.properties.onclick);
            element.innerText = vNode.getContent();
            vNode.domNode = element;
        }
        rootElement.appendChild(element);
    },
    render: function () {
        element.innerText = vNode.getContent();
        // console.log('rendering VDOM', vdom);
    }
};
//# sourceMappingURL=my-vdom.js.map