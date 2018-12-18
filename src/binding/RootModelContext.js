//@flow
import { map, filter } from 'rxjs/operators';
import { ObservableMap, MapAction, MapDeleteAction, MapSetAction } from "rxjs-observable-collections";
import { ModelContext } from './ModelContext';
import { ChildModelContext } from './ChildModelContext';

export class RootModelContext implements ModelContext {
    #viewModel : mixed;
    #variables : ObservableMap<string,mixed>;
    #allKeysObservable : rxjs$Observable<Array<string>>;
    #keyedObservables : Map<string,rxjs$Observable<mixed>>;

    get keys() : Iterator<string> { return this.#variables.keys(); };

    get observableKeys() : rxjs$Observable<Array<string>> { return this.#allKeysObservable; }

    getVm<T : mixed>() : T { return (this.#viewModel : any); }

    getOnce<T : mixed>(key : string) : ?T {
        return (this.#variables.get(key) : any);
    }
    get<T : mixed>(key : string) : rxjs$Observable<?T> {
        if(!this.#keyedObservables.has(key)) {
            const observable = this.#variables
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

            this.#keyedObservables.set(key, observable);
        }

        return (this.#keyedObservables.get(key) : any);
    }

    getAllOnce() : Map<string,mixed> {
        return new Map(this.#variables.entries());
    }
    getAll() : rxjs$Observable<MapAction<string,mixed>> {
        return this.#variables.actions;
    }

    set(key : string, value : mixed) : void {
        this.#variables.set(key, value);
    }

    createChild() : ModelContext { return new ChildModelContext(this); }

    constructor(viewModel : mixed) {
        this.#viewModel = viewModel;
        this.#variables = new ObservableMap<string,mixed>([['vm', viewModel]]);

        this.#allKeysObservable = this.#variables
            .actions
            .pipe(map(action => Array.from(action.map.keys())));

        this.#keyedObservables = new Map<string,rxjs$Observable<mixed>>();
    }
}
