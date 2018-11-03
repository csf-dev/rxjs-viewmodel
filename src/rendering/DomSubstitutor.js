//@flow
import { ProvidesBindingDom } from './BindingDom';
import { ElementError } from '../errors';
import getChildren from './getChildren';
import { tagName as placeholderTagName } from './ElementPlaceholder';

export interface ReplacesElementWithSubstitute {
    replaceTagsWithSubstitute(dom : ProvidesBindingDom) : void;
    restoreTags(dom : ProvidesBindingDom) : void;
    replaceElementWithSubstitute(dom : ProvidesBindingDom) : void;
    restoreElement(dom : ProvidesBindingDom) : void;
}

function getParent(node : Node, name : string) : Element {
    if(!node.parentElement)
        throw new ElementError(name, 'The element must have a parent.');
    return node.parentElement;
}

function replaceTagsWithSubstitute(dom : ProvidesBindingDom) : void {
    if(dom.omitTag) return;

    const children = getChildren(dom);
    const parent = getParent(dom.element, dom.element.tagName);

    parent.insertBefore(dom.placeholder.open, dom.element);
    children.forEach(item => {
        dom.element.removeChild(item);
        parent.insertBefore(item, dom.element);
    });
    parent.insertBefore(dom.placeholder.close, dom.element);

    dom.element.remove();
}

function restoreTags(dom : ProvidesBindingDom) : void {
    if(!dom.omitTag || dom.remove) return;
    
    const children = getChildren(dom);
    const parent = getParent(dom.placeholder.open, placeholderTagName);

    parent.insertBefore(dom.element, dom.placeholder.open);
    children.forEach(item => {
        parent.removeChild(item);
        dom.element.appendChild(item);
    });

    parent.removeChild(dom.placeholder.open);
    parent.removeChild(dom.placeholder.close);
}

function replaceElementWithSubstitute(dom : ProvidesBindingDom) : void {
    if(dom.remove) return;

    const parent = getParent(dom.element, dom.element.tagName);

    parent.insertBefore(dom.placeholder.standin, dom.element);
    dom.element.remove();
}

function restoreElement(dom : ProvidesBindingDom) : void {
    if(!dom.remove) return;

    const parent = getParent(dom.placeholder.standin, placeholderTagName);

    parent.insertBefore(dom.element, dom.placeholder.standin);
    parent.removeChild(dom.placeholder.standin);
}

export class DomSubstitutor implements ReplacesElementWithSubstitute {
    get replaceTagsWithSubstitute() { return replaceTagsWithSubstitute; }
    get restoreTags() { return restoreTags; }
    get replaceElementWithSubstitute() { return  replaceElementWithSubstitute; }
    get restoreElement() { return  restoreElement; }
}

const singleton = new DomSubstitutor();

export default function getSubstitutor() : ReplacesElementWithSubstitute { return singleton; }