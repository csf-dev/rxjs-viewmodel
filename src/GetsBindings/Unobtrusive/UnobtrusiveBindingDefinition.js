//@flow
import type { BindingDefinition } from '../BindingDefinition';

export type UnobtrusiveBindingDefinition<TParams : mixed>
    = { selector : string, bindings : BindingDefinition<TParams> | Array<BindingDefinition<TParams>> };