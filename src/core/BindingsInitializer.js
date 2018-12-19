//@flow
import BindingOptions from './BindingOptions';
import { getActivatableBindingsProvider } from '../GetsActivatableBindings';
import { getBulkBindingActivator } from '../ActivatesManyBindings';
import { LiveBindingsCollection } from '../binding';
import { getBindingsProvider } from '../GetsBindings';

export default class BindingsInitializer {
    #options : BindingOptions;
    #element : HTMLElement;

    async initialize(viewModel : mixed) : Promise<LiveBindingsCollection> {
        const opts = this.#options;

        const bindingsProvider = opts.bindingsProvider || getBindingsProvider(opts);
        const activatableBindingsProvider = opts.activatableBindingsProvider || getActivatableBindingsProvider();
        const bulkBindingActivator = opts.bulkBindingActivator || getBulkBindingActivator();

        const bindings = await bindingsProvider.getBindings(this.#element);
        const activatableBindings = await activatableBindingsProvider.getActivatableBindings(bindings, viewModel);
        const activationPromises = bulkBindingActivator.activateAll(activatableBindings);
        const activationsCompleted = await Promise.all(activationPromises);

        return new LiveBindingsCollection(activationsCompleted);
    }

    constructor(element : HTMLElement, options? : {}) {
        this.#element = element;
        this.#options = new BindingOptions(options || {});
    }
}