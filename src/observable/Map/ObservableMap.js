//@flow
import { ProvidesCurrentState } from '../ProvidesCurrentState';
import { ProvidesObservableValue } from '../ProvidesObservableValue';
import { IsReplacable } from '../IsReplacable';
import { MutableAsMap } from './MutableAsMap';
import { ProvidesMapObservables } from './ProvidesMapObservables';
import { BehaviorSubject, Subject } from 'rxjs';

export class ObservableMap<K,V> implements ProvidesCurrentState<Map<K,V>>,
                                           ProvidesObservableValue<Map<K,V>>,
                                           IsReplacable<Map<K,V>>,
                                           MutableAsMap<K,V>,
                                           ProvidesMapObservables<K,V> {
    #wrapped : Map<K,V>;
    #valueSubject : rxjs$Subject<Map<K,V>>;
    #valueSet : rxjs$Subject<[K,V]>;
    #valueDeleted : rxjs$Subject<K>;

    get valueSubject() : rxjs$Observable<Map<K,V>> { return this.#valueSubject; }
    get valueSet() : rxjs$Observable<[K,V]> { return this.#valueSet; }
    get valueDeleted() : rxjs$Observable<K> { return this.#valueDeleted; }

    getCurrent() : Map<K,V> { return cloneMap(this.#wrapped); }

    replaceWith(instance : Map<K,V>) {
        const clone = cloneMap(instance);
        this.#wrapped = clone;
        this.#valueSubject.next(this.#wrapped);
    }

    has(key : K) : bool { return this.#wrapped.has(key); }

    clear() : void {
        this.#wrapped.clear();
        this.#valueSubject.next(this.#wrapped);
    }

    delete(key : K) : bool {
        const result = this.#wrapped.delete(key);
        if(result) this.#valueDeleted.next(key);
        return result;
    }

    set(key : K, value : V) : Map<K,V> {
        const result = this.#wrapped.set(key, value);
        this.#valueSet.next([key, value]);
        return result;
    }

    constructor(wrapped? : Map<K,V>) {
        this.#wrapped = wrapped || new Map();
        this.#valueSubject = new BehaviorSubject(this.#wrapped);
        this.#valueSet = new Subject();
        this.#valueDeleted = new Subject();
    }
}

function cloneMap<K,V>(map : Map<K,V>) : Map<K,V> {
    const entries = map.entries();
    return new Map<K,V>(entries);
}
