//@flow
import { BindingDeclaration, BindingContext } from '../binding';
import type { ActivatableBinding, ElementsWithBindingDeclarations } from '../binding';

export interface GetsActivatableBindings {
    getActivatableBindings(bindings : ElementsWithBindingDeclarations, viewModel : mixed) : Promise<Array<ActivatableBinding<mixed>>>;
}

export { default as getActivatableBindingsProvider } from './ActivatableBindingsProvider';