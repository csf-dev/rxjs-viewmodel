//@flow
import registry from './ActivatorRegistry';
import type { BindingActivator } from '../binding';
import type { ActivatorIdentifier } from './ActivatorIdentifier';

export interface GetsBindingActivator {
    getActivator(name : string) : BindingActivator<mixed>;
}

export { default as activators } from './ActivatorRegistry';

export type { ActivatorIdentifier } from './ActivatorIdentifier';
export { ActivatorRegistry } from './ActivatorRegistry';

export default function getActivatorProvider() : GetsBindingActivator { return registry; }
