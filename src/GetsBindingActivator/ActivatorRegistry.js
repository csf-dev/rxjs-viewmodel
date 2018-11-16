//@flow
import type { BindingActivator } from '../binding';
import type { ActivatorIdentifier } from './ActivatorIdentifier';
import { GetsBindingActivator } from '.';

export interface RegistersBindingActivators {
    add(activator : BindingActivator<mixed>, alternativeName? : string) : void;
    remove(activator : ActivatorIdentifier<mixed>) : bool;
    getAll() : Map<string,BindingActivator<mixed>>;
}

function throwAlreadyRegisteredError(name : string) {
    throw new Error(`An activator named "${name}" is already registered; do not register the same activator twice.
If this is a distinct activator then consider registering using an alternative name.`);
}

export class ActivatorRegistry implements RegistersBindingActivators, GetsBindingActivator {
    #activators : Map<string,BindingActivator<mixed>>;

    add(activator : BindingActivator<mixed>, alternativeName? : string) : void {
        const name = alternativeName || activator.name;

        if(this.#activators.has(name))
            throwAlreadyRegisteredError(name);

        this.#activators.set(name, activator);
    }

    remove(activator : ActivatorIdentifier<mixed>) : bool {
        let keyToDelete : ?string;

        if(typeof activator !== 'string') {
            const entries = this.#activators.entries();
            keyToDelete = Array.from(entries)
                .filter(entry => entry[1] === activator)
                .map(entry => entry[0])
                .shift();
        }
        else {
            keyToDelete = activator;
        }
        
        if(!keyToDelete) return false;
        return this.#activators.delete(keyToDelete);
    }

    getAll() : Map<string,BindingActivator<mixed>> { return new Map(this.#activators); }

    getActivator(name : string) : Promise<BindingActivator<mixed>> {
        const activator = this.#activators.get(name);

        if(!activator)
            throw new Error(`There must be a registered activator with the name "${name}".`);
        
        return Promise.resolve(activator);
    }

    constructor() {
        this.#activators = new Map();
    }
}

const singleton : RegistersBindingActivators & GetsBindingActivator = new ActivatorRegistry();

export default singleton;