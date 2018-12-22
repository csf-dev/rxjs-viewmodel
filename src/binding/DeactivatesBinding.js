//@flow

export interface DeactivatesBinding {
    +deactivate : () => ?Promise<void>;
}