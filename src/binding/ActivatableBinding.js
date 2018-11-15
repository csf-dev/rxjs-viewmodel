//@flow
import BindingDeclaration from './BindingDeclaration';
import BindingContext from './BindingContext';

export type ActivatableBinding<TParams : mixed> = {
    binding : ?BindingDeclaration<TParams>,
    context : ?BindingContext<TParams>
};
