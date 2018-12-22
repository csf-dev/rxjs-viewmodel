//@flow
export interface ProvidesMutable<T> {
    getCopy() : T;
    updateWith(newValue : T) : void;
}