//@flow
import { GetsActivatableBindings } from './index';
import { GetsBindingContext } from './GetsBindingContext';
import { BindingDeclaration, BindingContext } from '../binding';
import type { ActivatableBinding, ElementsWithBindingDeclarations } from '../binding';
import type { ElementBinding } from '../GetsBindings';
import getModelContext, { ModelContext } from '../binding/ModelContext';
import { ModelContextCache } from './ModelContextCache';
import getBindingContextFactory from './BindingContextFactory';

export class ActivatableBindingsProvider implements GetsActivatableBindings {
    #bindingContextFactory : GetsBindingContext;

    getActivatableBindings(bindings : ElementsWithBindingDeclarations, viewModel : mixed) : Promise<Array<ActivatableBinding<mixed>>> {
        const rootModelContext = getModelContext(viewModel);
        const reducer = getBindingDeclarationReducer(this.#bindingContextFactory, rootModelContext);
        const bindingPromises = bindings.reduce(reducer, []);
        return Promise.all(bindingPromises);
    }

    constructor(bindingContextFactory : GetsBindingContext) {
        this.#bindingContextFactory  = bindingContextFactory;
    }
}

export default function getActivatableBindingsProvider() : GetsActivatableBindings {
    const contextFactory = getBindingContextFactory();
    return new ActivatableBindingsProvider(contextFactory);
}

function getBindingDeclarationReducer(contextFactory : GetsBindingContext, rootModelContext : ModelContext) {
    const modelsCache = new ModelContextCache(rootModelContext);

    return function (accumulator : Array<Promise<ActivatableBinding<mixed>>>,
                     item : ElementBinding) : Array<Promise<ActivatableBinding<mixed>>> {
        const { element, bindings } = item;
        const model = modelsCache.getModel(element);

        const activatableBindings = bindings
            .map(binding => {
                const context = contextFactory.getContext(element, binding, bindings, model);
                return Promise.resolve({ binding, context });
            });

        accumulator.push(...activatableBindings);
        return accumulator;
    }
}
