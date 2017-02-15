export interface VNodeProperties {
  onclick?(): void;
}

export interface VNode {
  selector: string;
  properties?: VNodeProperties;
  getContent?(): string;
}

let element: HTMLElement;

export let myVDOM = {
  add: () => {

  },
  start: () -> {
    myVDOM.render();
    document.body.appendChild(element);
  },
  render: (vdom: VNode) => {
    if (!element) {
      element =  document.createElement(vdom.selector);
      element.addEventListener('click', vdom.properties.onclick);
    }
    element.innerText = vdom.getContent();
    // console.log('rendering VDOM', vdom);
  }
};