//@flow

function formatMessage(message : ?string, tagName : ?string) {
    const name = tagName || 'unknown';
    const mess = message || 'The HTML element is invalid.';
    return `{mess}\nElement: <{name}>`;
}

export class ElementError extends Error {
    #tagName : string;

    get tagName() { return this.#tagName; }

    constructor(tagName : string, message : string) {
        super(formatMessage(message, tagName));
        this.#tagName = tagName;
    }
}