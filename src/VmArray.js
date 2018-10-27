//@flow
import { BehaviorSubject } from 'rxjs';
import { ProvidesSubject } from './ProvidesSubject';
import { CopyableToFromArray } from './CopyableToFromArray';
import { MutableAsArray } from './MutableAsArray';

export type VmArray<T> = CopyableToFromArray<T> & ProvidesSubject<Array<T>> & MutableAsArray<T>;

export class ViewModelArray<T> implements CopyableToFromArray<T>, ProvidesSubject<Array<T>>, MutableAsArray<T> {
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

    // Mutator methods
    // All of these call the corresponding method from
    // the internal state and then notify of mutation.
    copyWithin(target : number, start : number = 0 , end? : number) : Array<T> {
        const result = this.#state.copyWithin(target, start, end);
        this.#subject.next(this.#state);
        return result;
    }
    fill(value : T, start? : number, end? : number) : Array<T> {
        const result = this.#state.fill(value, start, end);
        this.#subject.next(this.#state);
        return result;
    }
    pop() : ?T {
        const result = this.#state.pop();
        this.#subject.next(this.#state);
        return result;
    }
    push(...elements : Array<T>) : number {
        const result = this.#state.push(...elements);
        this.#subject.next(this.#state);
        return result;
    }
    reverse() : Array<T> {
        const result = this.#state.reverse();
        this.#subject.next(this.#state);
        return result;
    }
    shift() : ?T {
        const result = this.#state.shift();
        this.#subject.next(this.#state);
        return result;
    }
    sort(compareFunction? : (a : T, b : T) => number) : Array<T> {
        const result = this.#state.sort(compareFunction);
        this.#subject.next(this.#state);
        return result;
    }
    splice(start : number, deleteCount? : number, ...items : Array<T>) :  Array<T> {
        const result = this.#state.splice(start, deleteCount, ...items);
        this.#subject.next(this.#state);
        return result;
    }
    unshift(...elements : Array<T>) : number {
        const result = this.#state.unshift(...elements);
        this.#subject.next(this.#state);
        return result;
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