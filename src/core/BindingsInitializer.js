//@flow
import BindingOptions from './BindingOptions';
import { GetsBindings } from '../GetsBindings';
import { GetsBindingContext, GetsActivatableBindings } from '../GetsActivatableBindings';
import { ActivatesManyBindings } from '../ActivatesManyBindings';
import { LiveBinding, LiveBindingsCollection, BindingDeclaration } from '../binding';
import type { ActivatableBinding } from '../binding';

function getDefaultBindingsProvider() : GetsBindings {
    throw new Error('Not implemented yet');
}

function getDefaultContextualBindingsProvider() : GetsActivatableBindings {
    throw new Error('Not implemented yet');
}
function getDefaultBulkBindingActivator() : ActivatesManyBindings {
    throw new Error('Not implemented yet');
}

function activateAll(contextualBindings : Array<ActivatableBinding<mixed>>,
                     bulkBindingActivator : ActivatesManyBindings) : Promise<Array<LiveBinding<mixed>>> {
    const activationPromises = bulkBindingActivator.activateAll(contextualBindings);
    return Promise.all(activationPromises);
}

export default class BindingsInitializer {
    #options : BindingOptions;
    #element : HTMLElement;

    async initialize(viewModel : mixed) : Promise<LiveBindingsCollection> {
        const opts = this.#options;

        const bindingsProvider = opts.bindingsProvider || getDefaultBindingsProvider();
        const contextualBindingsProvider = opts.contextualBindingsProvider || getDefaultContextualBindingsProvider();
        const bulkBindingActivator = opts.bulkBindingActivator || getDefaultBulkBindingActivator();

        const bindings = await bindingsProvider.getBindings(this.#element);
        const contextualBindings = await contextualBindingsProvider.getActivatableBindings(bindings);
        const activationsCompleted = await activateAll(contextualBindings, bulkBindingActivator);

        return new LiveBindingsCollection(activationsCompleted);
    }

    constructor(element : HTMLElement, options? : {}) {
        this.#element = element;
        this.#options = new BindingOptions(options || {});
    }
}