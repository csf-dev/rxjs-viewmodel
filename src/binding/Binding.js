//@flow
import { BindingActivator } from './BindingActivator';
import ModelContext from './ModelContext';

export default class Binding<TParams : mixed> {
    #activator : BindingActivator<TParams>;
    #paramsProvider : (ctx : ModelContext) => TParams;

    get activator() : BindingActivator<TParams> { return this.#activator; }
    
    getParameters(ctx : ModelContext) : TParams {
        // Seems like there's a bug in FlowJS.  It complains if I try to execute it like:
        //     return this.#paramsProvider(ctx);
        const provider = this.#paramsProvider;
        return provider(ctx);
    }

    constructor(activator : BindingActivator<TParams>,
                paramsProvider : (ctx : ModelContext) => TParams) {
        this.#activator = activator;
        this.#paramsProvider = paramsProvider;
    }
}
