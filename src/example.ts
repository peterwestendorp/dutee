import {myVDOM, VNode, h} from "./my-vdom";

let listItems: string[] = [];
let newItemName: string | undefined;

let addListItem = () => {
  if (newItemName) {
    listItems.push(newItemName);
    newItemName = undefined;
  }
};

let updateNewItemName = (evt: KeyboardEvent) => {
  newItemName = (evt.target as HTMLInputElement).value;
};

let removeListItem = (index: number) => {
  listItems.splice(index, 1);
  console.log(listItems);
};

let render = (): VNode => h('div', {}, [
  h('input', { onKeyDown: updateNewItemName }, []),
  h('button', { onClick: addListItem }, 'add item'),
  h('ul', {}, listItems.map((item, i) => h('li', { onClick: () => removeListItem(i) }, item)))
]);

myVDOM.init(render, document.getElementById('app') as HTMLElement);