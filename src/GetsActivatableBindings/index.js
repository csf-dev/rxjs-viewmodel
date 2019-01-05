//@flow
import { BindingDeclaration, BindingContext } from '../binding';
import type { ActivatableBinding, ElementsWithBindingDeclarations } from '../binding';
import type { BindingOptions } from '../options';

export interface GetsActivatableBindings {
    getActivatableBindings(bindings : ElementsWithBindingDeclarations,
                           viewModel : mixed,
                           options : BindingOptions) : Promise<Array<ActivatableBinding<mixed>>>;
}

export { default as getActivatableBindingsProvider } from './ActivatableBindingsProvider';