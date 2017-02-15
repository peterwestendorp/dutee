"use strict";
var element;
exports.myVDOM = {
    add: function () {
    },
    start: () -  > {
        myVDOM: .render(),
        document: .body.appendChild(element)
    },
    render: function (vdom) {
        if (!element) {
            element = document.createElement(vdom.selector);
            element.addEventListener('click', vdom.properties.onclick);
        }
        element.innerText = vdom.getContent();
        // console.log('rendering VDOM', vdom);
    }
};
//# sourceMappingURL=my-vdom.js.map