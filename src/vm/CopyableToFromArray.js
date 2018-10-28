//@flow
export interface CopyableToFromArray<T> {
    getShallowCopy() : Array<T>;
    replaceUsingCopyOf(replacement : Array<T>) : void;
}
