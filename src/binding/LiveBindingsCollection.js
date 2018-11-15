//@flow
import LiveBinding from './LiveBinding';

export default class LiveBindingsCollection {
    #bindings : Array<LiveBinding<mixed>>;

    get bindings() : Array<LiveBinding<mixed>> { return this.#bindings.slice(); }

    constructor(bindings : Array<LiveBinding<mixed>>) {
        this.#bindings = bindings;
    }
}