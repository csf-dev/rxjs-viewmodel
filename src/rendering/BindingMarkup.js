//@flow
import { SubstitutesElement } from './ElementPlaceholder';
import getPlaceholder from './ElementPlaceholder';
import getSubstitutor, { ReplacesElementWithSubstitute } from './DomSubstitutor';

export interface ProvidesBindingMarkup {
    +isRoot : bool;
    +element : HTMLElement;
    +placeholder : SubstitutesElement;
    omitTag : bool;
    remove : bool;
};

export class BindingMarkup implements ProvidesBindingMarkup {
    #isRoot : bool;
    #element : HTMLElement;
    #placeholder : SubstitutesElement;
    #substitutor : ReplacesElementWithSubstitute;

    #omitted : bool;
    #removed : bool;

    get isRoot() : bool { return this.#isRoot; }
    get element() : HTMLElement { return this.#element; }
    get placeholder() : SubstitutesElement { return this.#placeholder; }
    get omitTag() : bool { return this.#omitted; }
    set omitTag(val : bool) { 
        if(this.#removed) return;
        if(val === this.#omitted) return;

        if(val)
            this.#substitutor.replaceTagsWithSubstitute(this);
        else
            this.#substitutor.restoreTags(this);

        this.#omitted = val;
    }
    get remove() : bool { return this.#removed; }
    set remove(val : bool) { 
        if(val === this.#removed) return;
        
        if(val && this.omitTag) this.omitTag = false;

        if(val) this.#substitutor.replaceElementWithSubstitute(this);
        else    this.#substitutor.restoreElement(this);

        this.#removed = val;
        this.#omitted = val;
    }

    constructor(element : HTMLElement,
                isRoot : bool,
                placeholder : SubstitutesElement,
                substitutor : ReplacesElementWithSubstitute) {
        this.#element = element;
        this.#isRoot = isRoot;
        this.#placeholder = placeholder;
        this.#substitutor = substitutor;

        this.#omitted = false;
        this.#removed = false;
    }
}

export default function getMarkup(element : HTMLElement,
                                  isRoot : bool = false) : ProvidesBindingMarkup {
    const placeholder = getPlaceholder(element);
    const substitutor = getSubstitutor();
    return new BindingMarkup(element, isRoot, placeholder, substitutor);
}