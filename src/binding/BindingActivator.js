//@flow
import BindingContext from './BindingContext';

export interface BindingActivator<+TParams : mixed> {
    name : string;
    activate : (ctx : BindingContext<TParams>) => ?Promise<void>;
    deactivate? : (ctx : BindingContext<TParams>) => ?Promise<void>;
    activateAfter? : Array<string>;
    activateEarly? : bool;
};