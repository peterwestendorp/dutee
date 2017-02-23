export interface VNodeProperties {
  onClick?(): void;
}

export interface VNode {
  selector: string;
  properties: VNodeProperties;
  content: string | VNode[] | undefined;
  domNode?: HTMLElement;
}

interface Patch {};

export let h = (selector: string, properties: VNodeProperties, content: string | VNode[]): VNode => {
  return {
    selector,
    properties,
    content
  };
};

let lastTree: VNode;
let renderTree: () => VNode;

let patch = (patches: Patch[]) => {};

let diff = (newTree: VNode, oldTree: VNode) => {
  let patches: Patch[]  = [];
  let index = 0;

  let domNode = newTree.domNode = oldTree.domNode!;
  if (!newTree.content  || typeof newTree.content === 'string') {
    if (oldTree.content !== newTree.content) {
      patches.push({ index, type: 'TEXT', patch: newTree.content });
      index++;
    }
  } else {
    if (!Array.isArray(oldTree.content)) {
      throw new Error('not supported');
    }
    let oldChildren = oldTree.content;
    let newChildren = newTree.content;
    let iterations = (newChildren.length > oldChildren.length) ? newChildren.length : oldChildren.length;

    while (index < iterations) {
      let oldChild = oldChildren[index];
      let newChild = newChildren[index];
      if (oldChild && oldChild.selector !== newChild.selector) {
        patches.push({ index, type: 'SELECTOR', patch: newChild });
      }
      //   diffAndPatch(newChild, oldChild);
      //   oldIndex++;
      // } else {
      //   // TODO: look ahead to find if nodes were removed
      //   // for now assume insertion
      //   domNode.insertBefore(createNode(newChild), oldChildren[oldIndex].domNode! || null);
      // }
      // newIndex++;
    }
    // for (; oldIndex < oldChildren.length; oldIndex++) {
    //   let oldChild = oldChildren[oldIndex].domNode!;
    //   oldChild.parentElement!.removeChild(oldChild);
    // }
  }

  return patches;
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

    let patches = diff(currentTree, lastTree);
    if (patches.length) {
      patch(patches);
    }

    lastTree = currentTree;
  }
};