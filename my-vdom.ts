export interface VNodeProperties {
  onclick?(): void;
}

export interface VNode {
  selector: string;
  properties?: VNodeProperties;
  getContent?(): string;
  domNode?: HTMLElement;
}

let element: HTMLElement;
let vNode: VNode;

export let myVDOM = {
  add: (vnode: VNode) => {
    vNode = vnode;
    // create DOM element
  },
  append: (rootElement: HTMLElement) => {
    if (vNode) {
      element = document.createElement(vNode.selector);
      element.addEventListener('click', vNode.properties.onclick);
      element.innerText = vNode.getContent();

      vNode.domNode = element;
    }

    rootElement.appendChild(element);
  },
  render: () => {
    element.innerText = vNode.getContent();
    // console.log('rendering VDOM', vdom);
  }
};