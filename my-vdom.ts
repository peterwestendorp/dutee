export interface VNodeProperties {
  id: string;
  onClick?(): void;
}

export interface VNode {
  selector: string;
  properties?: VNodeProperties;
  content?: string | VNode[];
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
let renderTree: () => VNode;

let diff = (newTree: VNode, oldTree: VNode) => {
  let changed: VNode[] = [];
  let added: VNode[] = [];

  if (newTree.content.length) {
    (newTree.content as VNode[]).forEach((child, index) => {
      if (!oldTree.content[index]) {
        added.push(child);
      } else if (oldTree.content[index] && child !== oldTree.content[index]) {
        changed.push(child);
      }
    });
  }

  return {
    changed,
    added
  }
};

let append = (vnode: VNode, rootElement: HTMLElement) => {
  vnode.domNode = document.createElement(vnode.selector);
  vnode.domNode.addEventListener('click', vnode.properties.onClick);

  if (typeof vnode.content === 'string') {
  vnode.domNode.textContent = vnode.content;
} else if (vnode.content.length) {
  vnode.content.forEach((child) => {
    append(child, vnode.domNode);
  });
}

rootElement.appendChild(vnode.domNode);
};

export let myVDOM = {
  init: (render: () => VNode, rootElement: HTMLElement) => {
    renderTree = render;
    let vnode = render();

    append(vnode, rootElement);

    lastTree = vnode;
  },
  update: () => {
    let currentTree = renderTree();

    let difference = diff(currentTree, lastTree);

    lastTree = currentTree;
  }
};