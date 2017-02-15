import {VNodeProperties, VNode} from "./my-vdom";

export let h = (selector: string, properties: VNodeProperties, getContent: () => string): VNode => {
    return {
        selector,
        properties,
        getContent
    }
};