//@flow

export interface HasCurrentContext<TData : ?{}> {
    +current : TData;
}

export interface HasRootContext<TData : ?{}> {
    +root : TData;
}

export interface HasParentContext<TData : ?{}> {
    +parent : TData;
}