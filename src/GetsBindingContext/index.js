//@flow
import { Binding, BindingContext } from '../binding';
import type { ContextualBinding } from '../binding';

export interface GetsBindingContext {
    getContext(element : HTMLElement,
               binding : Binding<mixed>,
               allBindings : Array<Binding<mixed>>) : BindingContext<mixed>;
}

export interface GetsContextualBindings {
    getContextualBindings(bindings : Map<HTMLElement,Array<Binding<mixed>>>) : Array<ContextualBinding<mixed>>;
}

export { default as getContextualBindingsProvider } from './ContextualBindingsProvider';