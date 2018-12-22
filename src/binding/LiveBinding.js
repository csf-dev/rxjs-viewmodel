//@flow
import BindingContext from './BindingContext';
import { BindingActivator } from './BindingActivator';
import activatorDeactivatorFactory from './ActivatesAndDeactivatesBinding';
import { ActivatesAndDeactivatesBinding } from './ActivatesAndDeactivatesBinding';
import { DeactivatesBinding } from './DeactivatesBinding';

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
    #deactivationToken : ?DeactivatesBinding;

    get context() : BindingContext<TParams> { return this.#context; };
    get activator() : BindingActivator<TParams> { return this.#activator; };
    get isActive() { return this.#active; }

    async activate() : Promise<bool> {
        if(this.isActive) return Promise.resolve(false);
        this.#deactivationToken = await this.#activatorDeactivator.activate((this : StatefulBinding<mixed>));
        return Promise.resolve(true);
    }

    async deactivate() : Promise<bool> {
        if(!this.isActive || !this.#deactivationToken) return Promise.resolve(false);
        const done = await this.#activatorDeactivator.deactivate((this : StatefulBinding<mixed>), this.#deactivationToken);
        return Promise.resolve(true);
    }

    constructor(context : BindingContext<TParams>, activator : BindingActivator<TParams>) {
        this.#context = context;
        this.#activator = activator;
        this.#active = false;
        this.#activatorDeactivator = activatorDeactivatorFactory();
        this.#deactivationToken = null;
    }
};