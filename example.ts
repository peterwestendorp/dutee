import { h } from "./h";
import { myVDOM, VNode } from "./my-vdom";

let exampleContent = 'hallo wereld';

let exampleVNode: VNode = h('div', {
    onclick: () => {
      exampleContent += '!';
      console.log('klik');
      myVDOM.render();
    }
  },
  () => exampleContent
);

myVDOM.add(exampleVNode);
myVDOM.append(document.getElementById('app'));

