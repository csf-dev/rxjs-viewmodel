//@flow
import type { BindingActivator } from '../binding';

export type ActivatorIdentifier<TParams : mixed> = string | BindingActivator<TParams>;