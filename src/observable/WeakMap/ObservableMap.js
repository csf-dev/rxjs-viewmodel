//@flow
import { ProvidesCurrentState } from '../ProvidesCurrentState';
import { ProvidesObservableValue } from '../ProvidesObservableValue';
import { IsReplacable } from '../IsReplacable';
import { MutableAsWeakMap } from './MutableAsWeakMap';
import { ProvidesMapObservables } from '../Map/ProvidesMapObservables';
import { BehaviorSubject, Subject } from 'rxjs';

export class ObservableWeakMap<K,V> implements ProvidesCurrentState<WeakMap<K,V>>,
                                               ProvidesObservableValue<WeakMap<K,V>>,
                                               IsReplacable<WeakMap<K,V>>,
                                               MutableAsWeakMap<K,V>,
                                               ProvidesMapObservables<K,V> {
    #wrapped : WeakMap<K,V>;
    #valueSubject : rxjs$Subject<WeakMap<K,V>>;
    #valueSet : rxjs$Subject<[K,V]>;
    #valueDeleted : rxjs$Subject<K>;

    get valueSubject() : rxjs$Observable<WeakMap<K,V>> { return this.#valueSubject; }
    get valueSet() : rxjs$Observable<[K,V]> { return this.#valueSet; }
    get valueDeleted() : rxjs$Observable<K> { return this.#valueDeleted; }

    getCurrent() : WeakMap<K,V> { return this.#wrapped; }

    replaceWith(instance : WeakMap<K,V>) {
        this.#wrapped = instance;
        this.#valueSubject.next(this.#wrapped);
    }

    delete(key : K) : bool {
        const result = this.#wrapped.delete(key);
        if(result) this.#valueDeleted.next(key);
        return result;
    }

    set(key : K, value : V) : WeakMap<K,V> {
        const result = this.#wrapped.set(key, value);
        this.#valueSet.next([key, value]);
        return result;
    }

    constructor(wrapped : WeakMap<K,V>) {
        this.#wrapped = wrapped;
        this.#valueSubject = new BehaviorSubject(this.#wrapped);
        this.#valueSet = new Subject();
        this.#valueDeleted = new Subject();
    }
}
