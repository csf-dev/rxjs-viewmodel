//@flow
import { ProvidesBindingDom } from '../rendering/BindingDom';
import ModelContext from './ModelContext';
import BindingDeclaration from './BindingDeclaration';

export default class BindingContext<TParams : mixed> {
    #dom : ProvidesBindingDom;
    #model : ModelContext;
    #parameters : TParams;
    #allBindings : Array<BindingDeclaration<mixed>>;

    get dom() { return this.#dom; }
    get model() { return this.#model; }
    get parameters() { return this.#parameters; }
    getAllBindings() : Array<BindingDeclaration<mixed>> {
        return this.#allBindings.slice();
    }

    constructor(dom : ProvidesBindingDom,
                model : ModelContext,
                parameters : TParams,
                allBindings : Array<BindingDeclaration<mixed>>) {
        this.#dom = dom;
        this.#model = model;
        this.#parameters = parameters;
        this.#allBindings = allBindings;
    }
}
