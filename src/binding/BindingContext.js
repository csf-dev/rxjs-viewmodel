//@flow
import { ProvidesBindingMarkup } from '../rendering/BindingMarkup';
import ModelContext from './ModelContext';
import { Binding } from './Binding';

export default class BindingContext<TParams : mixed> {
    #markup : ProvidesBindingMarkup;
    #model : ModelContext;
    #parameters : TParams;
    #allActions : Array<Binding<mixed>>;

    get markup() { return this.#markup; }
    get model() { return this.#model; }
    get parameters() { return this.#parameters; }
    getAllActions() : Array<Binding<mixed>> {
        return this.#allActions.slice();
    }

    constructor(markup : ProvidesBindingMarkup,
                model : ModelContext,
                parameters : TParams,
                allActions : Array<Binding<mixed>>) {
        this.#markup = markup;
        this.#model = model;
        this.#parameters = parameters;
        this.#allActions = allActions;
    }
}
