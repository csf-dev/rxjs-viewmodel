//@flow
import { BindingActivator } from '../binding/BindingActivator';

export type ActivatorIdentifier<+TParams : mixed> = string | BindingActivator<TParams>;