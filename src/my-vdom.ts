export interface VNodeProperties {
  onClick?(evt: MouseEvent): void;
  onKeyDown?(evt: KeyboardEvent): void;
}

export interface VNode {
  selector: string;
  properties: VNodeProperties;
  content: string | VNode[] | undefined;
  domNode?: HTMLElement;
}

export let h = (selector: string, properties: VNodeProperties, content: string | VNode[]): VNode => {
  return {
    selector,
    properties,
    content
  };
};

let lastTree: VNode;
let rootElement: HTMLElement;
let renderTree: () => VNode;

let diffAndPatch = (newTree: VNode, oldTree: VNode, parent: HTMLElement, index: number) => {
  if (!oldTree) {
    append(newTree, parent);
  } else if (!newTree) {
    parent.removeChild(parent.childNodes[index]);
  } else if ((newTree.selector !== oldTree.selector) || (typeof newTree.content === 'string' && newTree.content !== oldTree.content)) {
    parent.replaceChild(createNode(newTree), parent.childNodes[index]);
  } else if (newTree !== oldTree && Array.isArray(newTree.content) && Array.isArray(oldTree.content)) {
    for (let i = 0; i < newTree.content.length || i < oldTree.content.length; i++) {
      diffAndPatch(newTree.content[i], oldTree.content[i], parent.childNodes[index] as HTMLElement, i);
    }
  }
};

let createNode = (vnode: VNode): HTMLElement => {
  let element = document.createElement(vnode.selector);

  if (typeof vnode.content === 'string') {
    element.textContent = vnode.content;
  } else if (!Array.isArray(vnode.content)) {
    throw new Error('VNode content should be either String or VNode[]');
  } else {
    vnode.content.forEach((child) => {
      append(child, element);
    });
  }

  if (vnode.properties.onClick) {
    element.addEventListener('click', (evt: MouseEvent) => {
      vnode.properties.onClick!(evt);
      myVDOM.update();
    });
  }

  if (vnode.properties.onKeyDown) {
    element.addEventListener('keydown', (evt: KeyboardEvent) => {
      vnode.properties.onKeyDown!(evt);
      myVDOM.update();
    });
  }

  return element;
};

let append = (vnode: VNode, rootElement: HTMLElement) => {
  vnode.domNode = createNode(vnode);

  rootElement.appendChild(vnode.domNode);
};

export let myVDOM = {
  init: (render: () => VNode, element: HTMLElement) => {
    rootElement = element;
    renderTree = render;
    let vnode = render();

    append(vnode, rootElement);

    lastTree = vnode;
  },
  update: () => {
    let currentTree = renderTree();

    diffAndPatch(currentTree, lastTree, rootElement, 0);

    lastTree = currentTree;
  }
};