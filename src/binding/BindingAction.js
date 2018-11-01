//@flow
import BindingContext from './BindingContext';

export default class BindingAction<TParams : mixed> {
    name : string;
    handler : (ctx : BindingContext<TParams>) => void;
    dependencyActions : Array<string>;
}