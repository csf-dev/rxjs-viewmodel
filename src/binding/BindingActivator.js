//@flow
import BindingContext from './BindingContext';
import { DeactivatesBinding } from './DeactivatesBinding';

export interface BindingActivator<+TParams : mixed> {
    +name : string;
    +activate : (ctx : BindingContext<TParams>) => ?Promise<DeactivatesBinding>;
};