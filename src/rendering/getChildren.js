//@flow
import { ProvidesBindingMarkup } from './BindingMarkup';

export default function getChildren(markup : ProvidesBindingMarkup) : Array<Node> {
    if(markup.remove) return [];
    if(!markup.omitTag) return Array.from(markup.element.children);

    const children : Array<Node> = [];
    let currentChild = markup.placeholder.open.nextSibling;

    while (currentChild && currentChild !== markup.placeholder.close) {
        children.push(currentChild);
        currentChild = currentChild.nextSibling;
    }

    return children;
}