export interface VNodeProperties {
  onClick?(): void;
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
let renderTree: () => VNode;

let diffAndPatch = (newTree: VNode, oldTree: VNode) => {
  let domNode = newTree.domNode = oldTree.domNode!;
  if (!newTree.content  || typeof newTree.content === 'string') {
    if (oldTree.content !== newTree.content) {
      domNode.textContent = newTree.content || '';
    }
  } else {
    if (!Array.isArray(oldTree.content)) {
      throw new Error('not supported');
    }
    let oldChildren = oldTree.content;
    let newChildren = newTree.content;
    let oldIndex = 0;
    let newIndex = 0;
    while (newIndex < newChildren.length) {
      let oldChild = oldChildren[oldIndex];
      let newChild = newChildren[newIndex];
      if (oldChild && oldChild.selector === newChild.selector) {
        console.log('diffAndPatch', newChild, oldChild);
        diffAndPatch(newChild, oldChild);
        oldIndex++;
      } else {
        // TODO: look ahead to find if nodes were removed
        // for now assume insertion
        console.log('here', newChild, oldChildren)
        domNode.insertBefore(createNode(newChild), oldChildren[oldIndex].domNode! || null);
      }
      newIndex++;
    }
    for (; oldIndex < oldChildren.length; oldIndex++) {
      let oldChild = oldChildren[oldIndex].domNode!;
      oldChild.parentElement!.removeChild(oldChild);
    }
  }
};

let createNode = (vnode: VNode): HTMLElement => {
  let element = document.createElement(vnode.selector);
  if (vnode.properties.onClick) {
    element.addEventListener('click', vnode.properties.onClick);
  }

  return element;
};

let append = (vnode: VNode, rootElement: HTMLElement) => {
  vnode.domNode = createNode(vnode);

  if (typeof vnode.content === 'string') {
    vnode.domNode.textContent = vnode.content;
  } else if (!Array.isArray(vnode.content)) {
    throw new Error('not supported');
  } else {
    vnode.content.forEach((child) => {
      append(child, vnode.domNode!);
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

    diffAndPatch(currentTree, lastTree);

    lastTree = currentTree;
  }
};