//@flow
import { ObservableMap } from '../observable/Map/ObservableMap';
import { ReplacesElementWithSubstitute } from '../rendering/DomSubstitutor';
import { merge  } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export default class ModelContext {
    #root : ?mixed;
    #parent : ?ModelContext;
    #variables : ObservableMap<string,mixed>;

    getRoot<T : mixed>() : T {
        if(!this.#parent) return (this.#root : any);
        return this.#parent.getRoot<T>();
    }

    getObservableVariable<T : mixed>(key : string) : rxjs$Observable<?T> {
        const parentSet = this.#parent? this.#parent.getObservableVariable<T>(key) : undefined;
        const observed : Array<ObservableVals<T>> = [
            this.#variables.valueSet,
            this.#variables.valueDeleted,
            this.#variables.valueSubject
        ];
        if(parentSet) observed.push(parentSet);

        const allObservables = merge<ObservableVal<T>>(...observed);
        const onlyObservablesForThisVariable : rxjs$Observable<ObservableVal<T>> = allObservables
            .pipe(filter(getVariableFilter(key)));
        return onlyObservablesForThisVariable.pipe(map(mapValues));
    }

    /*
    get<T>(key : string) : ?T {
        if(!this.#valueMap.has(key)) return undefined;
        return (this.#valueMap.get(key) : any);
    }
    getKeys() : Array<string> { return Array.from(this.#valueMap.keys()); }
    set(key : string, value : mixed) : void { this.#valueMap.set(key, value); }
    getChild() : ModelContext {
        const child = new ModelContext(this.#root);
        this.#valueMap.forEach((val, key, map) => child.set(key, val));
        return child;
    }
    getAll() : {} {
        const output = {};
        this.#valueMap.forEach((val, key) => output[key] = val);
        return output;
    }
    */

    constructor(parent : ModelContext | mixed) {
        if(parent instanceof ModelContext)
        {
            this.#parent = parent;
            this.#root = undefined;
        }
        else
        {
            this.#parent = undefined;
            this.#root = parent;
        }

        this.#variables = new ObservableMap();
    }
}

type ObservableVals<T> = rxjs$Observable<[string, mixed]>
                        | rxjs$Observable<Map<string, mixed>>
                        | rxjs$Observable<?T>;

type ObservableVal<T> = [string, mixed]
                        | Map<string, mixed>
                        | string
                        | ?T;

function getVariableFilter<T>(varName : string) : (val : ObservableVal<T>, idx : number) => bool {
    return function filterSetters<T>(val : ObservableVal<T>, idx : number) : bool {
        if(val instanceof Map && val.has(varName)) return true;
        if(Array.isArray(val) && val[0] === varName) return true;
            return ;
        return val == undefined;
    }
}

function mapValues<T>(val : ObservableVal<T>, idx : number) : T {
    throw new Error('Not implemented');
}