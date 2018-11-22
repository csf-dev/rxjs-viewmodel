//@flow

export interface MutableAsMap<K,V> {
    clear() : void,
    delete(key : K) : bool,
    set(key : K, value : V) : Map<K,V>
};