//@flow
import { ModelContext } from '../binding/ModelContext';
import type { ActivatorIdentifier } from '../GetsBindingActivator';

export type BindingDefinition<TParams : mixed> = {
    activator : ActivatorIdentifier<TParams>,
    paramsProvider : (ctx : ModelContext) => TParams
};