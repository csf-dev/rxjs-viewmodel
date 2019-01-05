//@flow
import { getActivatableBindingsProvider } from '../GetsActivatableBindings';
import { getBulkBindingActivator } from '../ActivatesManyBindings';
import { LiveBindingsCollection } from '../binding';
import { getBindingsProvider } from '../GetsBindings';
import { GetsBindingOptions, BindingOptionsFactory } from '../options';
import type { MaybeBindingOptions, BindingOptions } from '../options';

export default class BindingsInitializer {
    #options : BindingOptions;
    #element : HTMLElement;

    async initialize(viewModel : mixed) : Promise<LiveBindingsCollection> {
        const bindings = await this.#options.bindingsProvider.getBindings(this.#element);
        const activatableBindings = await this.#options.activatableBindingsProvider.getActivatableBindings(bindings, viewModel);
        const activationPromises = this.#options.bulkBindingActivator.activateAll(activatableBindings);
        const activationsCompleted = await Promise.all(activationPromises);

        return new LiveBindingsCollection(activationsCompleted);
    }

    constructor(element : HTMLElement, options? : MaybeBindingOptions, optionsFactory : GetsBindingOptions) {
        this.#element = element;
        this.#options = optionsFactory.getOptions(options);
    }
}