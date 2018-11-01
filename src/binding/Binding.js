//@flow
import BindingAction from './BindingAction';

export class Binding<TParams : mixed> {
    action : BindingAction<TParams>;
    parameters : TParams;
}
