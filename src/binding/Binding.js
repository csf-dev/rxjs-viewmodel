//@flow
import BindingAction from './BindingAction';

export class Binding<TParams : mixed> {
    #action : BindingAction<TParams>;
    #parameters : TParams;

    get action() : BindingAction<TParams> { return this.#action; }
    get parameters() : TParams { return this.#parameters; }

    constructor(action : BindingAction<TParams>,
                parameters : TParams) {
        this.#action = action;
        this.#parameters = parameters;
    }
}
