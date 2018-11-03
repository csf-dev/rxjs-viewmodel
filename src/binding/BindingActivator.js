//@flow
import BindingContext from './BindingContext';

export interface BindingActivator<TParams : mixed> {
    name : string;

    /** 
     * Mandatory
     */
    activate : (ctx : BindingContext<TParams>) => void;

    beforeFirstActivation? : (ctx : BindingContext<TParams>) => void;
    deactivate? : (ctx : BindingContext<TParams>) => void;
    activateAfter? : Array<string>;
};