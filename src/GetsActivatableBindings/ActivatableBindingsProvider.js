//@flow
import { GetsActivatableBindings } from './index';
import { GetsBindingContext } from './GetsBindingContext';
import { BindingDeclaration } from '../binding';
import type { ActivatableBinding } from '../binding';
import BindingOptions from '../core/BindingOptions';

export class ActivatableBindingsProvider implements GetsActivatableBindings {
    #contextFactory : GetsBindingContext;

    getActivatableBindings(bindings : Map<HTMLElement,Array<BindingDeclaration<mixed>>>) : Promise<Array<ActivatableBinding<mixed>>> {
        const entries = Array.from(bindings.entries());
        const reducer = getBindingDeclarationReducer(this.#contextFactory);
        const bindingPromises = entries.reduce(reducer, []);
        return Promise.all(bindingPromises);
    }

    constructor(contextFactory : GetsBindingContext) {
        this.#contextFactory  = contextFactory;
    }
}

export default function getActivatableBindingsProvider(options : BindingOptions) {
    if(!options.bindingContextProvider) throw new Error('Not implemented yet');
    return new ActivatableBindingsProvider(options.bindingContextProvider);
}

function getBindingDeclarationReducer(contextFactory : GetsBindingContext) {
    return function (accumulator : Array<Promise<ActivatableBinding<mixed>>>,
                     item : [HTMLElement, Array<BindingDeclaration<mixed>>]) : Array<Promise<ActivatableBinding<mixed>>> {
        const [ element, elementBindings ] = item;

        const activatableBindings = elementBindings
            .map(binding => {
                return contextFactory.getContext(element, binding, elementBindings)
                    .then((context) : Promise<ActivatableBinding<mixed>> => Promise.resolve({ binding, context }));
            });

        accumulator.push(...activatableBindings);
        return accumulator;
    }
}
