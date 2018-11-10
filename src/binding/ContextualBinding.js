//@flow
import Binding from './Binding';
import BindingContext from './BindingContext';

export type ContextualBinding<TParams : mixed> = {
    binding : ?Binding<TParams>,
    context : ?BindingContext<TParams>
};
