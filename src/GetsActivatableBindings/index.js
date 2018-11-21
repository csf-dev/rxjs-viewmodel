//@flow
import { BindingDeclaration, BindingContext } from '../binding';
import type { ActivatableBinding } from '../binding';

export interface GetsActivatableBindings {
    getActivatableBindings(bindings : Map<HTMLElement,Array<BindingDeclaration<mixed>>>) : Promise<Array<ActivatableBinding<mixed>>>;
}

export { default as getActivatableBindingsProvider } from './ActivatableBindingsProvider';