//@flow
import BindingContext from './BindingContext';
import { BindingActivator } from './BindingActivator';

export default class ActivatedBinding<TParams : mixed> {
    #context : BindingContext<TParams>;
    #activator : BindingActivator<TParams>;

    get context() : BindingContext<TParams> { return this.#context; };
    get activator() : BindingActivator<TParams> { return this.#activator; };

    constructor(context : BindingContext<TParams>, activator : BindingActivator<TParams>) {
        this.#context = context;
        this.#activator = activator;
    }
};