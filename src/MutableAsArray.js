//@flow
export interface MutableAsArray<TItem> {
    copyWithin(target : number, start : number, end? : number) : Array<TItem>;
    fill(value : TItem, start? : number, end? : number) : Array<TItem>;
    pop() : ?TItem;
    push(...elements : Array<TItem>) : number;
    reverse() : Array<TItem>;
    shift() : ?TItem;
    sort(compareFunction? : (a : TItem, b : TItem) => number) : Array<TItem>;
    splice(start : number, deleteCount? : number, ...items? : Array<TItem>) :  Array<TItem>;
    unshift(...elements : Array<TItem>) : number;
};