//@flow
import { BindingDeclaration, BindingContext } from '../binding';
import type { ActivatableBinding } from '../binding';

export interface GetsBindingContext {
    getContext(element : HTMLElement,
               binding : BindingDeclaration<mixed>,
               allBindings : Array<BindingDeclaration<mixed>>) : BindingContext<mixed>;
}

export interface GetsActivatableBindings {
    getContextualBindings(bindings : Map<HTMLElement,Array<BindingDeclaration<mixed>>>) : Array<ActivatableBinding<mixed>>;
}

export { default as getContextualBindingsProvider } from './ActivatableBindingsProvider';