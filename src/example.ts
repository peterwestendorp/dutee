import {myVDOM, VNode, h} from "./my-vdom";

let listItems: string[] = [];

let addListItem = (name: string) => {
  if (name) {
    listItems.push(name);
  }
};

let updateNewItemName = (evt: KeyboardEvent) => {
  let inputElement = evt.target as HTMLInputElement;
  if (evt.key === 'Enter') {
    addListItem(inputElement.value);
    inputElement.value = '';
  }
};

let removeListItem = (index: number) => {
  listItems.splice(index, 1);
};

let render = (): VNode => h('div', {}, [
  h('input', { onKeyDown: updateNewItemName }, []),
  h('ul', {}, listItems.map((item, i) => h('li', { onClick: () => removeListItem(i) }, item)))
]);

myVDOM.init(render, document.getElementById('app') as HTMLElement);