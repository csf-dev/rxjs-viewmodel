//@flow
import BindingContext from './BindingContext';
import { BindingActivator } from './BindingActivator';
import activatorDeactivatorFactory from './ActivatesAndDeactivatesBinding';
import { ActivatesAndDeactivatesBinding } from './ActivatesAndDeactivatesBinding';

export interface StatefulBinding<+TParams : mixed> {
    +isActive : bool;
    +context : BindingContext<TParams>;
    +activator : BindingActivator<TParams>;
    activate() : Promise<bool>;
    deactivate() : Promise<bool>;
}

export default class LiveBinding<TParams : mixed> implements StatefulBinding<TParams> {
    #context : BindingContext<TParams>;
    #activator : BindingActivator<TParams>;
    #active : bool;
    #activatorDeactivator : ActivatesAndDeactivatesBinding;

    get context() : BindingContext<TParams> { return this.#context; };
    get activator() : BindingActivator<TParams> { return this.#activator; };
    get isActive() { return this.#active; }

    activate() : Promise<bool> {
        if(this.isActive) return Promise.resolve(false);
        return this.#activatorDeactivator.activate((this : StatefulBinding<mixed>));
    }

    deactivate() : Promise<bool> {
        if(!this.isActive) return Promise.resolve(false);
        return this.#activatorDeactivator.deactivate((this : StatefulBinding<mixed>));
    }

    constructor(context : BindingContext<TParams>, activator : BindingActivator<TParams>) {
        this.#context = context;
        this.#activator = activator;
        this.#active = false;
        this.#activatorDeactivator = activatorDeactivatorFactory();
    }
};