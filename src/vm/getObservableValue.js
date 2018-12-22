//@flow
import type { ProvidesValue } from './ProvidesValue';
import { isObservable, from } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

export default function getObservableValue<T>(input : ProvidesValue<T>) : rxjs$Observable<T> {
    if(isObservable(input)) return (input : any);
    if(input instanceof Promise) return from(input);
    return new BehaviorSubject((input : any));
}