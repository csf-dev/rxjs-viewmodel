//@flow
import { GetsBindingContext } from './GetsBindingContext';
import { BindingDeclaration, BindingContext, getModelContext } from '../binding';
import { ModelContext } from '../binding/ModelContext';
import { getDom } from '../rendering';

export class BindingContextFactory implements GetsBindingContext {
    getContext<T : mixed>(element : HTMLElement,
                          binding : BindingDeclaration<T>,
                          allBindings : Array<BindingDeclaration<mixed>>,
                          modelContext : ModelContext) : BindingContext<?T> {
        const dom = getDom(element);
        const parameters = getParameters(binding, modelContext);

        return new BindingContext<?T>(dom, modelContext, parameters, allBindings);
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