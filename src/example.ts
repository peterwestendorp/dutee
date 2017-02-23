import {myVDOM, VNode, h} from "./my-vdom";

let listItems = ['item 0'];

let addListItem = () => {
  listItems.push(`item ${listItems.length}`);
};

let render = (): VNode => h('ul', {
    onClick: () => {
      addListItem();
      myVDOM.update();
    }
  },
  listItems.map(item => h('li', {}, item))
);

myVDOM.init(render, document.getElementById('app') as HTMLElement);