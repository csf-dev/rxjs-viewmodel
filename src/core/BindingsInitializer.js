//@flow
import BindingOptions from './BindingOptions';
import { ActivatedBinding, ActivatedBindings, Binding } from '../binding';
import { GetsBindings } from './GetsBindings';
import { GetsBindingContext } from './GetsBindingContext';
import { ActivatesManyBindings } from './ActivatesManyBindings';
import type { ContextualBinding } from './ContextualBinding';

function getDefaultBindingsProvider() : GetsBindings {
    throw new Error('Not implemented yet');
}

function getDefaultBindingContextProvider() : GetsBindingContext {
    throw new Error('Not implemented yet');
}
function getDefaultBulkBindingActivator() : ActivatesManyBindings {
    throw new Error('Not implemented yet');
}

function getContextualBindings(bindings : Map<HTMLElement,Array<Binding<mixed>>>,
                               bindingContextProvider : GetsBindingContext) : Array<ContextualBinding<mixed>> {
    const output : Array<ContextualBinding<mixed>> = [];

    bindings.forEach((elementBindings, element) => {
        elementBindings.forEach(binding => {
            const context = bindingContextProvider.getContext(element, binding, elementBindings);
            output.push({ binding: binding, context: context });
        });
        
    });

    return output;
}

function activateAll(contextualBindings : Array<ContextualBinding<mixed>>,
                     bulkBindingActivator : ActivatesManyBindings) : Promise<Array<ActivatedBinding<mixed>>> {
    const activationPromises = bulkBindingActivator.activateAll(contextualBindings);
    return Promise.all(activationPromises);
}

export default class BindingsInitializer {
    #options : BindingOptions;
    #element : HTMLElement;

    async initialize(viewModel : mixed) : Promise<ActivatedBindings> {
        const opts = this.#options;

        const bindingsProvider = opts.bindingsProvider || getDefaultBindingsProvider();
        const bindingContextProvider = opts.bindingContextProvider || getDefaultBindingContextProvider();
        const bulkBindingActivator = opts.bulkBindingActivator || getDefaultBulkBindingActivator();

        const bindings = await bindingsProvider.getBindings(this.#element);
        const contextualBindings = getContextualBindings(bindings, bindingContextProvider);
        const activationsCompleted = await activateAll(contextualBindings, bulkBindingActivator);

        return new ActivatedBindings(activationsCompleted);
    }

    constructor(element : HTMLElement, options? : {}) {
        this.#element = element;
        this.#options = new BindingOptions(options || {});
    }
}