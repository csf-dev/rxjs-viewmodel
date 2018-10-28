//@flow
import { HasCurrentContext, HasRootContext } from './HasContext';

export class BindingContext<TData : ?{},TRootData : {}>
        implements HasCurrentContext<TData>, HasRootContext<TRootData> {
    #data : TData;
    #rootData : TRootData;

    get current() : TData { return this.#data; }
    get root() : TRootData { return this.#rootData; }

    constructor(data : TData, rootData : TRootData) {
        this.#data = data;
        this.#rootData = rootData;
    }
}

