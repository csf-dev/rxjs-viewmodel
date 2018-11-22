//@flow

export interface ProvidesCurrentState<+T : mixed> {
    getCurrent() : T;
}