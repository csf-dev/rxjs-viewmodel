//@flow
import { GetsBindingContext, GetsContextualBindings } from './index';
import { Binding } from '../binding';
import type { ContextualBinding } from '../binding';
import BindingOptions from '../core/BindingOptions';

export class ContextualBindingsProvider implements GetsContextualBindings {
    #contextFactory : GetsBindingContext;

    getContextualBindings(bindings : Map<HTMLElement,Array<Binding<mixed>>>) : Array<ContextualBinding<mixed>> {
        const output : Array<ContextualBinding<mixed>> = [];

        bindings.forEach((elementBindings, element) => {
            elementBindings.forEach(binding => {
                const context = this.#contextFactory.getContext(element, binding, elementBindings);
                output.push({ binding: binding, context: context });
            });
        });

        return output;
    }

    constructor(contextFactory : GetsBindingContext) {
        this.#contextFactory  = contextFactory;
    }
}

export default function getContextualBindingsProvider(options : BindingOptions) {
    if(!options.bindingContextProvider) throw new Error('Not implemented yet');
    return new ContextualBindingsProvider(options.bindingContextProvider);
}