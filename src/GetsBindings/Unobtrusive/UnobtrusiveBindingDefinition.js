//@flow
import type { BindingDefinition } from '../BindingDefinition';

export type UnobtrusiveBindingDefinition
    = { selector : string, bindings : BindingDefinition<mixed> | Array<BindingDefinition<mixed>> };