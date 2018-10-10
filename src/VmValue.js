//@flow
import { BehaviorSubject } from 'rxjs';

export interface VmValue<T> {
    subject : rxjs$Subject<T>;
    value : T;
}

export class ViewModelValue<T> implements VmValue<T> {
    _state : T;
    subject : rxjs$Subject<T>;
    get value() : T { return this._state; };
    set value(val : T) : void {
        this._state = val;
        this.subject.next(val);
    };
    constructor(initial : T) {
        this._state = initial;
        this.subject = new BehaviorSubject(initial);
    }
}

export default function createVmValue<T>(initial : T) : VmValue<T> {
    return new ViewModelValue<T>(initial);
}