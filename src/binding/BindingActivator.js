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
    activate : (ctx : BindingContext<TParams>) => ?Promise<void>;
    deactivate? : (ctx : BindingContext<TParams>) => ?Promise<void>;
    activateAfter? : Array<string>;
    activationPhase? : ActivationPhase;
};