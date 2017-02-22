import {myVDOM, VNode, h} from "./my-vdom";

let listItems: VNode[] = [
  h('li', { id: 'list-item-0' }, `item 0`)
];

let addListItem = () => {
  listItems.push(h('li', { id: `list-item-${listItems.length}` }, `item ${listItems.length}`))
};

let render = (): VNode => h('ul', {
    id: 'list',
    onClick: () => {
      console.log('klik');
      addListItem();
      myVDOM.update();
    }
  },
  listItems
);

myVDOM.init(render, document.getElementById('app'));