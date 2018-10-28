//@flow
import { BindingContext } from './BindingContext';
import { ChildBindingContext } from './ChildBindingContext';

export interface CreatesBindingContexts {
    createRootContext<TRootData : {}>(data : TRootData) : BindingContext<TRootData,TRootData>;
    createChildContext<TData : ?{},TParentData : {},TRootData : {}>(parentContext : BindingContext<TParentData,TRootData>,
                                                                    childData : TData) : ChildBindingContext<TData,TParentData,TRootData>;
}

export class BindingContextFactory implements CreatesBindingContexts {
    createRootContext<TRootData : {}>(data : TRootData) : BindingContext<TRootData,TRootData> {
        return new BindingContext(data, data);
    }
    createChildContext<TData : ?{},TParentData : {},TRootData : {}>(parentContext : BindingContext<TParentData,TRootData>,
                                                                    childData : TData) : ChildBindingContext<TData,TParentData,TRootData> {
        return new ChildBindingContext(childData, parentContext.current, parentContext.root);
    }
}

const staticFactory = new BindingContextFactory();

export default function getContextFactory() : CreatesBindingContexts { return staticFactory; }