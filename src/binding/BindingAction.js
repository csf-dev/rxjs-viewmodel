//@flow
import BindingContext from './BindingContext';

export default class BindingAction<TParams : mixed> {
    #name : string;
    #handler : (ctx : BindingContext<TParams>) => void;

    get name() : string { return this.#name; }
    get handler() : (ctx : BindingContext<TParams>) => void { return this.#handler; }
    dependencyActions : Array<string>;

    constructor(name : string, handler : (ctx : BindingContext<TParams>) => void) {
        this.#name = name;
        this.#handler = handler;
        this.dependencyActions = [];
    }
}