import { h } from "./h";
import { myVDOM, VNode } from "./my-vdom";

let exampleContent = 'hello world';
let exampleVNode: VNode = h('div', {
    onclick: () => {
      exampleContent += '!';
      console.log('klik');
    }
  },
  () => exampleContent
);

myVDOM.add(exampleVNode);
myVDOM.append(document.getElementById('app'));

