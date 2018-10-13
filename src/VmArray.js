//@flow
import { BehaviorSubject } from 'rxjs';
import { ProvidesSubject } from './ProvidesSubject';
import { CopyableToFromArray } from './CopyableToFromArray';

export type VmArray<T> = CopyableToFromArray<T> & ProvidesSubject<Array<T>>;

export class ViewModelArray<T> implements CopyableToFromArray<T>, ProvidesSubject<Array<T>> {
    //Fields
    #state : Array<T>;
    #subject : rxjs$Subject<Array<T>>;

    // Properties
    get subject() : rxjs$Subject<Array<T>> { return this.#subject; };
    getShallowCopy() : Array<T> {
        return this.#state.slice();
    }
    replaceUsingCopyOf(replacement : Array<T>) : void {
        this.#state = replacement.slice();
        this.#subject.next(this.#state);
    }

    // Constructor
    constructor(initial : Array<T>) {
        this.#state = initial.slice();
        this.#subject = new BehaviorSubject(this.#state);
    }
}

export default function createVmArray<T>(initial : Array<T>) : VmArray<T> {
    return new ViewModelArray<T>(initial);
}