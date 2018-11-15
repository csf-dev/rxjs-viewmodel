//@flow
import { GetsBindingContext, GetsActivatableBindings } from './index';
import { BindingDeclaration } from '../binding';
import type { ActivatableBinding } from '../binding';
import BindingOptions from '../core/BindingOptions';

export class ActivatableBindingsProvider implements GetsActivatableBindings {
    #contextFactory : GetsBindingContext;

    getContextualBindings(bindings : Map<HTMLElement,Array<BindingDeclaration<mixed>>>) : Array<ActivatableBinding<mixed>> {
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
    return new ActivatableBindingsProvider(options.bindingContextProvider);
}