export interface VNodeProperties {
  onclick?(): void;
}

export interface VNode {
  selector: string;
  properties?: VNodeProperties;
  getContent?(): string;
}

let element: HTMLElement;
let vNode: VNode;

export let myVDOM = {
  add: (vnode: VNode) => {
    vNode = vnode;
  },
  append: (rootElement: HTMLElement) => {
    if (vNode) {
      element = document.createElement(vNode.selector);
      element.addEventListener('click', vNode.properties.onclick);
      element.innerText = vNode.getContent();
    }

    rootElement.appendChild(element);
  },
  render: () => {
    // element.innerText = vdom.getContent();
    // console.log('rendering VDOM', vdom);
  }
};