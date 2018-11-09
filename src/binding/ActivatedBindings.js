//@flow
import ActivatedBinding from './ActivatedBinding';

export default class ActivatedBindings {
    #bindings : Array<ActivatedBinding<mixed>>;

    get bindings() : Array<ActivatedBinding<mixed>> { return this.#bindings.slice(); }

    constructor(bindings : Array<ActivatedBinding<mixed>>) {
        this.#bindings = bindings;
    }
}