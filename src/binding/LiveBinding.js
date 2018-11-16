//@flow
import BindingContext from './BindingContext';
import { BindingActivator } from './BindingActivator';

export default class LiveBinding<TParams : mixed> {
    #context : BindingContext<TParams>;
    #activator : BindingActivator<TParams>;
    #active : bool;

    get context() : BindingContext<TParams> { return this.#context; };
    get activator() : BindingActivator<TParams> { return this.#activator; };
    get isActive() { return this.#active; }

    activate() : Promise<bool> {
        if(this.isActive) return Promise.resolve(false);

        return Promise.resolve(this.activator.activate(this.context))
            .then(undef => Promise.resolve(true));
    }

    deactivate() : Promise<bool> {
        if(!this.isActive) return Promise.resolve(false);
        if(!this.activator.deactivate) return Promise.resolve(false);
        
        return Promise.resolve(this.activator.deactivate(this.context))
            .then(undef => Promise.resolve(true));
    }

    constructor(context : BindingContext<TParams>, activator : BindingActivator<TParams>) {
        this.#context = context;
        this.#activator = activator;
        this.#active = false;
    }
};