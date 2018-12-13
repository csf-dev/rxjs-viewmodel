//@flow
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObservableMap, MapAction, MapReplaceContentsAction } from "rxjs-observable-collections";
import { ModelContext } from './ModelContext';

export class ChildModelContext implements ModelContext {
    #parent : ModelContext;
    #variables : ObservableMap<string,mixed>;

    get keys() : Iterator<string> {
        return this.getAll().keys();
    };

    get observableKeys() : rxjs$Observable<Array<string>> {
        return this.getAllObservable().pipe(map(action => Array.from(action.map.keys())));
    }

    getViewModel<T : mixed>() : T { return this.#parent.getViewModel<T>(); }

    get<T : mixed>(key : string) : ?T {
        return (this.getAll().get(key) : any);
    }

    getAll() : Map<string,mixed> {
        const output = new Map<string,mixed>(this.#parent.getAll());

        for (const kvp of this.#variables.entries())
            output.set(kvp[0], kvp[1]);

        return output;
    }

    getObservable<T : mixed>(key : string) : rxjs$Observable<?T> {
        return this.getAllObservable().pipe(map(action => (action.map.get(key) : any)));
    }
    getAllObservable() : rxjs$Observable<MapAction<string,mixed>> {
        const parentObservable = this.#parent.getAllObservable();
        const thisObservable = this.#variables.actions;
        return combineLatest(parentObservable, thisObservable).pipe(map(getCombinedMap));
    }

    set(key : string, value : mixed) : void {
        this.#variables.set(key, value);
    }

    createChild() : ModelContext { return new ChildModelContext(this); }

    constructor(parent : ModelContext) {
        this.#parent = parent;
        this.#variables = new ObservableMap<string,mixed>();
    }
}

function getCombinedMap(actions : [MapAction<string,mixed>,MapAction<string,mixed>]) : MapAction<string,mixed> {
    const latestParent = actions[0];
    const latestSelf = actions[1];

    const output = new ObservableMap<string,mixed>(latestParent.map.entries());

    for (const kvp of latestSelf.map.entries())
        output.set(kvp[0], kvp[1]);

    return new MapReplaceContentsAction<string,mixed>(output, new Map<string,mixed>());
}
