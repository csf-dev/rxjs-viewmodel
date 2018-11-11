//@flow
import registry, { RegistersBindingActivators, GetsBindingActivator } from './ActivatorRegistry';

const activators : RegistersBindingActivators = registry;

export type { ActivatorIdentifier } from './ActivatorIdentifier';
export { GetsBindingActivator,
         RegistersBindingActivators,
         ActivatorRegistry } from './ActivatorRegistry';
export { activators };

export default function getActivatorProvider() : GetsBindingActivator { return registry; }
