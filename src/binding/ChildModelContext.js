//@flow
import { combineLatest } from 'rxjs';
import { map, filter, withLatestFrom } from 'rxjs/operators';
import { ObservableMap, MapAction, MapReplaceContentsAction, MapDeleteAction, MapSetAction } from "rxjs-observable-collections";
import { ModelContext } from './ModelContext';

export class ChildModelContext implements ModelContext {
    #parent : ModelContext;
    #variables : ObservableMap<string,mixed>;
    #allKeysObservable : rxjs$Observable<Array<string>>;
    #allItemsObservable : rxjs$Observable<MapAction<string,mixed>>;
    #keyedObservables : Map<string,rxjs$Observable<mixed>>;

    get keys() : Iterator<string> {
        return this.getAllOnce().keys();
    };

    get observableKeys() : rxjs$Observable<Array<string>> { return this.#allKeysObservable; }

    getVm<T : mixed>() : T { return this.#parent.getVm<T>(); }

    getOnce<T : mixed>(key : string) : ?T {
        return (this.getAllOnce().get(key) : any);
    }

    getAllOnce() : Map<string,mixed> {
        const output = new Map<string,mixed>(this.#parent.getAllOnce());

        for (const kvp of this.#variables.entries())
            output.set(kvp[0], kvp[1]);

        return output;
    }

    get<T : mixed>(key : string) : rxjs$Observable<?T> {
        if(!this.#keyedObservables.has(key)) {
            const valuesInThisContext = this.#variables
                .actions
                .pipe(filter(action => {
                    if (action instanceof MapDeleteAction)
                        return action.key === key;
                    if (action instanceof MapSetAction)
                        return action.key === key;
                    return true;
                }))
                .pipe(map(action => {
                    const value = action.map.get(key);
                    return ((value : any) : ?T);
                }));
            
            const valuesInParentContext = this.#parent.get<T>(key)
                .pipe(withLatestFrom(valuesInThisContext))
                .pipe(filter(actions => actions[1] === undefined))
                .pipe(map((actions : [?T,?T]) => actions[0]));

            const observable = combineLatest(valuesInThisContext, valuesInParentContext)
                .pipe(map(actions => {
                    const output = (actions[0] !== undefined)? actions[0] : actions[1];
                    return (output : any);
                }));
            
            this.#keyedObservables.set(key, observable);
        }

        return (this.#keyedObservables.get(key) : any);
    }
    getAll() : rxjs$Observable<MapAction<string,mixed>> { return this.#allItemsObservable; }

    set(key : string, value : mixed) : void {
        this.#variables.set(key, value);
    }

    createChild() : ModelContext { return new ChildModelContext(this); }

    constructor(parent : ModelContext) {
        this.#parent = parent;
        this.#variables = new ObservableMap<string,mixed>();

        this.#allItemsObservable = getAllItemsObservable(this.#parent.getAll(), this.#variables.actions);
        this.#allKeysObservable = this.#allItemsObservable
            .pipe(map(action => Array.from(action.map.keys())));

        this.#keyedObservables = new Map<string,rxjs$Observable<mixed>>();
    }
}

type TwoMapActionStreams = [MapAction<string,mixed>,MapAction<string,mixed>];
type ActionStream = rxjs$Observable<MapAction<string,mixed>>;

function getAllItemsObservable(parentStream : ActionStream, thisStream : ActionStream) {
    return combineLatest(parentStream, thisStream)
        .pipe(filter(disregardOverridenParentItems))
        .pipe(map(getCombinedMap));
}

function getCombinedMap(actions : TwoMapActionStreams) : MapAction<string,mixed> {
    const latestParent = actions[0];
    const latestSelf = actions[1];

    const output = new ObservableMap<string,mixed>(latestParent.map.entries());

    for (const kvp of latestSelf.map.entries())
        output.set(kvp[0], kvp[1]);

    return new MapReplaceContentsAction<string,mixed>(output, new Map<string,mixed>());
}

function disregardOverridenParentItems(actions : TwoMapActionStreams) : bool {
    if(actions[0] instanceof MapDeleteAction)
        return !actions[1].map.has(actions[0].key);
    if(actions[0] instanceof MapSetAction)
        return !actions[1].map.has(actions[0].key);
    return true;
}