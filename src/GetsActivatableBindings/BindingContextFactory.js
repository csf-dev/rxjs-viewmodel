//@flow
import { GetsBindingContext } from './GetsBindingContext';
import { BindingDeclaration, BindingContext, getModelContext } from '../binding';
import { ModelContext } from '../binding/ModelContext';
import { getDom } from '../rendering';

export class BindingContextFactory implements GetsBindingContext {
    #vmRoot : mixed;

    getContext<T : mixed>(element : HTMLElement,
                          binding : BindingDeclaration<T>,
                          allBindings : Array<BindingDeclaration<mixed>>,
                          parentContext? : Promise<BindingContext<mixed>>) : Promise<BindingContext<?T>> {
        const dom = getDom(element);
        const model = getModel(parentContext, this.#vmRoot);
        const parameters = getParameters(binding, model);

        return Promise.all([model, parameters])
            .then(([m, p]) => Promise.resolve(new BindingContext<?T>(dom, m, p, allBindings)));
    }

    constructor(vmRoot : mixed) {
        this.#vmRoot = vmRoot;
    }
}

function getModel(parentContext : ?Promise<BindingContext<mixed>>, vmRoot : mixed) : Promise<ModelContext> {
    if(!parentContext) return Promise.resolve(getModelContext(vmRoot));
    return parentContext.then(parent => Promise.resolve(parent.model.createChild()));
}

function getParameters<T>(binding : BindingDeclaration<T>,
                          model : Promise<ModelContext>) : Promise<?T> {
    return model.then(m => {
        let params : ?T

        try { params = binding.getParameters(m); }
        catch(e) { params = undefined; }

        return Promise.resolve(params);
    });
}

export default function getBindingContextFactory(vmRoot : mixed) : GetsBindingContext {
    return new BindingContextFactory(vmRoot);
}