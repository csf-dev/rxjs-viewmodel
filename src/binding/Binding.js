//@flow
import { BindingActivator } from './BindingActivator';

export class Binding<TParams : mixed> {
    #activator : BindingActivator<TParams>;
    #parameters : TParams;

    get activator() : BindingActivator<TParams> { return this.#activator; }
    get parameters() : TParams { return this.#parameters; }

    constructor(activator : BindingActivator<TParams>,
                parameters : TParams) {
        this.#activator = activator;
        this.#parameters = parameters;
    }
}
