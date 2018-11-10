//@flow
import BindingOptions from './BindingOptions';
import { GetsBindings } from '../GetsBindings';
import { GetsBindingContext, GetsContextualBindings } from '../GetsBindingContext';
import { ActivatesManyBindings } from '../ActivatesManyBindings';
import { ActivatedBinding, ActivatedBindings, Binding } from '../binding';
import type { ContextualBinding } from '../binding';

function getDefaultBindingsProvider() : GetsBindings {
    throw new Error('Not implemented yet');
}

function getDefaultContextualBindingsProvider() : GetsContextualBindings {
    throw new Error('Not implemented yet');
}
function getDefaultBulkBindingActivator() : ActivatesManyBindings {
    throw new Error('Not implemented yet');
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
        const contextualBindingsProvider = opts.contextualBindingsProvider || getDefaultContextualBindingsProvider();
        const bulkBindingActivator = opts.bulkBindingActivator || getDefaultBulkBindingActivator();

        const bindings = await bindingsProvider.getBindings(this.#element);
        const contextualBindings = contextualBindingsProvider.getContextualBindings(bindings);
        const activationsCompleted = await activateAll(contextualBindings, bulkBindingActivator);

        return new ActivatedBindings(activationsCompleted);
    }

    constructor(element : HTMLElement, options? : {}) {
        this.#element = element;
        this.#options = new BindingOptions(options || {});
    }
}