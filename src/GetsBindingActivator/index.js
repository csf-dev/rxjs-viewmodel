//@flow
import registry from './ActivatorRegistry';
import { BindingActivator } from '../binding/BindingActivator';
import type { ActivatorIdentifier } from './ActivatorIdentifier';

export interface GetsBindingActivator {
    getActivator(name : string) : Promise<BindingActivator<mixed>>;
}

export { default } from './ActivatorRegistry';

export type { ActivatorIdentifier } from './ActivatorIdentifier';
export { ActivatorRegistry } from './ActivatorRegistry';
