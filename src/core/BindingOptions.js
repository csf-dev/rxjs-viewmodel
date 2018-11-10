//@flow
import { GetsBindings, GetsBindingContext, ActivatesManyBindings } from '../binding';

export const bindingsProvder = 'bindingsProvider';
export const bindingContextProvider = 'bindingContextProvider';
export const bulkBindingActivator = 'bulkBindingActivator';

export default class BindingOptions {
    #options : Map<string,mixed>;

    get bindingsProvider() : ?GetsBindings {
        const output : any = this.#options.get(bindingsProvder);
        return (output : GetsBindings) || null;
    }
    get bindingContextProvider() : ?GetsBindingContext  {
        const output : any = this.#options.get(bindingContextProvider);
        return (output : GetsBindingContext) || null;
    }
    get bulkBindingActivator() : ?ActivatesManyBindings  {
        const output : any = this.#options.get(bulkBindingActivator);
        return (output : ActivatesManyBindings) || null;
    }

    get(key : string) : mixed { return this.#options.get(key); }

    constructor(source : {}) {
        this.#options = new Map();
        const keys : Array<string> = Object.getOwnPropertyNames(source);
        keys.forEach(key => this.#options.set(key, source[key]));
    }
}