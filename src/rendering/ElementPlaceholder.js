//@flow
import { MissingBrowserError } from '../errors';

export const tagName : string = 'Element comment placeholder';

export interface SubstitutesElement {
    +open : Node;
    +close : Node;
    +standin : Node;
}

export class ElementPlaceholder implements SubstitutesElement {
    #open : Comment;
    #close : Comment;
    #standin : Comment;

    get open() : Node { return this.#open; }
    get close() : Node { return this.#close; }
    get standin() : Node { return this.#standin; }

    constructor(open : Comment, close : Comment, standin : Comment) {
        this.#open = open;
        this.#close = close;
        this.#standin = standin;
    }
}

export default function getPlaceholder(element : HTMLElement) : SubstitutesElement {
    if(!document) throw new MissingBrowserError('Missing document object');

    const tagName = element.tagName;
    return new ElementPlaceholder(document.createComment(` Placeholder: Open <${tagName}> `),
                                  document.createComment(` Placeholder: Close <${tagName}> `),
                                  document.createComment(` Placeholder: <${tagName}> `));
}