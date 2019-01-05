//@flow
import { GetsBindingContext } from './GetsBindingContext';
import { BindingDeclaration, BindingContext, getModelContext } from '../binding';
import { ModelContext } from '../binding/ModelContext';
import { getDom } from '../rendering';
import type { BindingOptions } from '../options';

export class BindingContextFactory implements GetsBindingContext {
    getContext<T : mixed>(element : HTMLElement,
                          binding : BindingDeclaration<T>,
                          allBindings : Array<BindingDeclaration<mixed>>,
                          modelContext : ModelContext,
                          options : BindingOptions) : BindingContext<?T> {
        const dom = getDom(element);
        const parameters = getParameters(binding, modelContext);
        const shallowCopiedOptions : BindingOptions = { ...options };

        return new BindingContext<?T>(dom, modelContext, parameters, allBindings, shallowCopiedOptions);
    }
}

function getParameters<T>(binding : BindingDeclaration<T>,
                          model : ModelContext) : ?T {
    try { return binding.getParameters(model); }
    catch(e) { return undefined; }
}

export default function getBindingContextFactory() : GetsBindingContext {
    return new BindingContextFactory();
}