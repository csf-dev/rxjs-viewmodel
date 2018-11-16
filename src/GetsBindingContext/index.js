//@flow
import { BindingDeclaration, BindingContext } from '../binding';
import type { ActivatableBinding } from '../binding';

export interface GetsBindingContext {
    getContext(element : HTMLElement,
               binding : BindingDeclaration<mixed>,
               allBindings : Array<BindingDeclaration<mixed>>) : Promise<BindingContext<mixed>>;
}

export interface GetsActivatableBindings {
    getContextualBindings(bindings : Map<HTMLElement,Array<BindingDeclaration<mixed>>>) : Promise<Array<ActivatableBinding<mixed>>>;
}

export { default as getContextualBindingsProvider } from './ActivatableBindingsProvider';