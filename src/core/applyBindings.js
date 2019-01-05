//@flow
import BindingsInitializer from './BindingsInitializer';
import type { MaybeBindingOptions } from '../options';
import { BindingOptionsFactory } from '../options';

export default function applyBindings(element : HTMLElement, viewModel : mixed, options? : MaybeBindingOptions) {
    const optionsFactory = new BindingOptionsFactory();
    const initializer = new BindingsInitializer(element, options, optionsFactory);
    return initializer.initialize(viewModel);
}