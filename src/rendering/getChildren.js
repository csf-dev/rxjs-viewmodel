//@flow
import { ProvidesBindingDom } from './BindingDom';

export default function getChildren(markup : ProvidesBindingDom) : Array<Node> {
    if(markup.remove) return [];
    if(!markup.omitTag) return Array.from(markup.element.childNodes);

    const children : Array<Node> = [];
    let currentChild = markup.placeholder.open.nextSibling;

    while (currentChild && currentChild !== markup.placeholder.close) {
        children.push(currentChild);
        currentChild = currentChild.nextSibling;
    }

    return children;
}