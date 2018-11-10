//@flow
import { ProvidesBindingDom } from '../rendering/BindingDom';
import ModelContext from './ModelContext';
import Binding from './Binding';

export default class BindingContext<TParams : mixed> {
    #dom : ProvidesBindingDom;
    #model : ModelContext;
    #parameters : TParams;
    #allBindings : Array<Binding<mixed>>;

    get dom() { return this.#dom; }
    get model() { return this.#model; }
    get parameters() { return this.#parameters; }
    getAllBindings() : Array<Binding<mixed>> {
        return this.#allBindings.slice();
    }

    constructor(dom : ProvidesBindingDom,
                model : ModelContext,
                parameters : TParams,
                allBindings : Array<Binding<mixed>>) {
        this.#dom = dom;
        this.#model = model;
        this.#parameters = parameters;
        this.#allBindings = allBindings;
    }
}
