//@flow
import { BindingContext } from './BindingContext';
import { HasCurrentContext, HasRootContext, HasParentContext } from './HasContext';

export class ChildBindingContext<TData : ?{},TParentData : {},TRootData : {}>
        extends BindingContext<TData,TRootData>
        implements HasCurrentContext<TData>, HasRootContext<TRootData>, HasParentContext<TParentData> {
    #parentData : TParentData;

    get parent() : TParentData { return this.#parentData; }

    constructor(current : TData, parent : TParentData, root : TRootData) {
        super(current, root);
        this.#parentData = parent;
    }
}