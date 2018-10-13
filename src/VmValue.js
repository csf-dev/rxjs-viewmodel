//@flow
import { BehaviorSubject } from 'rxjs';
import { ProvidesSubject } from './ProvidesSubject';
import { ProvidesValue } from './ProvidesValue';

export type VmValue<T> = ProvidesValue<T> & ProvidesSubject<T>;

export class ViewModelValue<T> implements ProvidesValue<T>, ProvidesSubject<T> {
    //Fields
    #state : T;
    #subject : rxjs$Subject<T>;

    // Properties
    get subject() : rxjs$Subject<T> { return this.#subject; };
    get value() : T { return this.#state; };
    set value(val : T) : void {
        this.#state = val;
        this.subject.next(this.#state);
    };

    // Constructor
    constructor(initial : T) {
        this.#state = initial;
        this.#subject = new BehaviorSubject(initial);
    }
}

export default function createVmValue<T>(initial : T) : VmValue<T> {
    return new ViewModelValue<T>(initial);
}