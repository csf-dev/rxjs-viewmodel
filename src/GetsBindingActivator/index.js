//@flow
import registry from './ActivatorRegistry';
import type { BindingActivator } from '../binding';
import type { ActivatorIdentifier } from './ActivatorIdentifier';

export interface RegistersBindingActivators {
    add(activator : BindingActivator<mixed>, alternativeName? : string) : void;
    remove(activator : ActivatorIdentifier<mixed>) : bool;
    getAll() : Map<string,BindingActivator<mixed>>;
}

export interface GetsBindingActivator {
    getActivator(name : string) : BindingActivator<mixed>;
}

const activators : RegistersBindingActivators = registry;
export { activators };

export type { ActivatorIdentifier } from './ActivatorIdentifier';
export { ActivatorRegistry } from './ActivatorRegistry';

export default function getActivatorProvider() : GetsBindingActivator { return registry; }
