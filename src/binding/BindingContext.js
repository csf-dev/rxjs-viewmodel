//@flow
import { ProvidesBindingDom } from '../rendering/BindingDom';
import getModelContext, { ModelContext } from './ModelContext';
import BindingDeclaration from './BindingDeclaration';
import type { BindingOptions } from '../options';

export default class BindingContext<+TParams : mixed> {
    #dom : ProvidesBindingDom;
    #model : ModelContext;
    #parameters : TParams;
    #allBindings : Array<BindingDeclaration<mixed>>;
    #options : BindingOptions;

    get dom() { return this.#dom; }
    get model() { return this.#model; }
    get parameters() : TParams { return this.#parameters; }
    getAllBindings() : Array<BindingDeclaration<mixed>> {
        return this.#allBindings.slice();
    }
    get options() { return this.#options; }

    constructor(dom : ProvidesBindingDom,
                model : ModelContext,
                parameters : TParams,
                allBindings : Array<BindingDeclaration<mixed>>,
                options : BindingOptions) {
        this.#dom = dom;
        this.#model = model;
        this.#parameters = parameters;
        this.#allBindings = allBindings;
        this.#options = options;
    }
}
