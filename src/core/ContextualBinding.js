//@flow
import { Binding, BindingContext } from '../binding';

export type ContextualBinding<TParams : mixed> = {
    binding : Binding<TParams>,
    context : BindingContext<TParams>
};
