//@flow
import { GetsActivatableBindings } from './index';
import { GetsBindingContext } from './GetsBindingContext';
import { BindingDeclaration } from '../binding';
import type { ActivatableBinding, ElementsWithBindingDeclarations } from '../binding';
import type { ElementBinding } from '../GetsBindings';
import BindingOptions from '../core/BindingOptions';

export class ActivatableBindingsProvider implements GetsActivatableBindings {
    #contextFactory : GetsBindingContext;

    getActivatableBindings(bindings : ElementsWithBindingDeclarations) : Promise<Array<ActivatableBinding<mixed>>> {
        const reducer = getBindingDeclarationReducer(this.#contextFactory);
        const bindingPromises = bindings.reduce(reducer, []);
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
                     item : ElementBinding) : Array<Promise<ActivatableBinding<mixed>>> {
        const { element, bindings } = item;

        const activatableBindings = bindings
            .map(binding => {
                return contextFactory.getContext(element, binding, bindings)
                    .then((context) : Promise<ActivatableBinding<mixed>> => Promise.resolve({ binding, context }));
            });

        accumulator.push(...activatableBindings);
        return accumulator;
    }
}
