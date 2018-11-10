//@flow
import { BindingActivator } from '../binding';

export interface GetsBindingActivator {
    getActivator(name : string) : BindingActivator<mixed>;
}

export type { ActivatorIdentifier } from './ActivatorIdentifier';