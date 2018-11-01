//@flow
import { ProvidesBindingMarkup } from './BindingMarkup';
import DataContext from './DataContext';
import { Binding } from './Binding';

export default class BindingContext<TParams : mixed> {
    #markup : ProvidesBindingMarkup;
    #data : DataContext;
    #parameters : TParams;
    #allActions : Array<Binding<mixed>>;

    get markup() { return this.#markup; }
    get data() { return this.#data; }
    get parameters() { return this.#parameters; }
    getAllActions() : Array<Binding<mixed>> {
        return this.#allActions.slice();
    }

    constructor(markup : ProvidesBindingMarkup,
                data : DataContext,
                parameters : TParams,
                allActions : Array<Binding<mixed>>) {
        this.#markup = markup;
        this.#data = data;
        this.#parameters = parameters;
        this.#allActions = allActions;
    }
}
