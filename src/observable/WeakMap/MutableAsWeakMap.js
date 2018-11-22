//@flow

export interface MutableAsWeakMap<K,V> {
    delete(key : K) : bool,
    set(key : K, value : V) : WeakMap<K,V>
};