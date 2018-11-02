//@flow
import { ProvidesBindingMarkup } from './BindingMarkup';
import { ElementError } from '../errors';
import getChildren from './getChildren';
import { tagName as placeholderTagName } from './ElementPlaceholder';

export interface ReplacesElementWithSubstitute {
    replaceTagsWithSubstitute(markup : ProvidesBindingMarkup) : void;
    restoreTags(markup : ProvidesBindingMarkup) : void;
    replaceElementWithSubstitute(markup : ProvidesBindingMarkup) : void;
    restoreElement(markup : ProvidesBindingMarkup) : void;
}

function getParent(node : Node, name : string) : Element {
    if(!node.parentElement)
        throw new ElementError(name, 'The element must have a parent.');
    return node.parentElement;
}

function replaceTagsWithSubstitute(markup : ProvidesBindingMarkup) : void {
    if(markup.omitTag) return;

    const children = Array.from(markup.element.children);
    const parent = getParent(markup.element, markup.element.tagName);

    parent.insertBefore(markup.placeholder.open, markup.element);
    children.forEach(item => {
        markup.element.removeChild(item);
        parent.insertBefore(item, markup.element);
    });
    parent.insertBefore(markup.placeholder.close, markup.element);

    markup.element.remove();
}

function restoreTags(markup : ProvidesBindingMarkup) : void {
    if(!markup.omitTag || markup.remove) return;
    
    const children = getChildren(markup);
    const parent = getParent(markup.placeholder.open, placeholderTagName);

    parent.insertBefore(markup.element, markup.placeholder.open);
    children.forEach(item => {
        parent.removeChild(item);
        markup.element.appendChild(item);
    });

    parent.removeChild(markup.placeholder.open);
    parent.removeChild(markup.placeholder.close);
}

function replaceElementWithSubstitute(markup : ProvidesBindingMarkup) : void {
    if(markup.remove) return;

    const parent = getParent(markup.element, markup.element.tagName);

    parent.insertBefore(markup.placeholder.standin, markup.element);
    markup.element.remove();
}

function restoreElement(markup : ProvidesBindingMarkup) : void {
    if(!markup.remove || markup.omitTag) return;

    const parent = getParent(markup.placeholder.standin, placeholderTagName);

    parent.insertBefore(markup.element, markup.placeholder.standin);
    parent.removeChild(markup.placeholder.standin);
}

export class DomSubstitutor implements ReplacesElementWithSubstitute {
    get replaceTagsWithSubstitute() { return replaceTagsWithSubstitute; }
    get restoreTags() { return restoreTags; }
    get replaceElementWithSubstitute() { return  replaceElementWithSubstitute; }
    get restoreElement() { return  restoreElement; }
}

const singleton = new DomSubstitutor();

export default function getSubstitutor() : ReplacesElementWithSubstitute { return singleton; }