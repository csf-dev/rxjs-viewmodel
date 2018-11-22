//@flow

export interface ProvidesMapObservables<K,V> {
    +valueSet : rxjs$Observable<[K,V]>;
    +valueDeleted : rxjs$Observable<K>;
}