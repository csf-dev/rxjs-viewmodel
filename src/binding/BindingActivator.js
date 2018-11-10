//@flow
import BindingContext from './BindingContext';

export const activationPhase = {
    early: 'early',
    normal: 'normal',
    late: 'late',
};

export type ActivationPhase = $Keys<typeof activationPhase>;

export interface BindingActivator<TParams : mixed> {
    name : string;
    activate : (ctx : BindingContext<TParams>) => void;
    deactivate? : (ctx : BindingContext<TParams>) => void;
    activateAfter? : Array<string>;
    activationPhase? : ActivationPhase;
};