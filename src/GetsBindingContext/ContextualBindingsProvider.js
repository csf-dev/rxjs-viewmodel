//@flow
import { GetsBindingContext, GetsContextualBindings } from './index';
import { Binding } from '../binding';
import type { ContextualBinding } from '../binding';
import BindingOptions from '../core/BindingOptions';

export class ContextualBindingsProvider implements GetsContextualBindings {
    #contextFactory : GetsBindingContext;

    getContextualBindings(bindings : Map<HTMLElement,Array<Binding<mixed>>>) : Array<ContextualBinding<mixed>> {
        return Array.from(bindings.entries()).reduce((acc, next) => {
            const [ element, elementBindings ] = next;

            acc.push(...elementBindings.map(binding => {
                return {
                    binding: binding,
                    context: this.#contextFactory.getContext(element, binding, elementBindings)
                };
            }));

            return acc;
        }, []);
    }

    constructor(contextFactory : GetsBindingContext) {
        this.#contextFactory  = contextFactory;
    }
}

export default function getContextualBindingsProvider(options : BindingOptions) {
    if(!options.bindingContextProvider) throw new Error('Not implemented yet');
    return new ContextualBindingsProvider(options.bindingContextProvider);
}