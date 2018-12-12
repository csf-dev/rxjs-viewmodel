//@flow
import { map } from 'rxjs/operators';
import { ObservableMap, MapAction } from "rxjs-observable-collections";
import { ModelContext } from './ModelContext';
import { ChildModelContext } from './ChildModelContext';

export class RootModelContext implements ModelContext {
    #viewModel : mixed;
    #variables : ObservableMap<string,mixed>;

    get keys() : Iterator<string> { return this.#variables.keys(); };

    get observableKeys() : rxjs$Observable<Array<string>> {
        return this.#variables
            .actions
            .pipe(map(action => Array.from(action.map.keys())));
    }

    getViewModel<T : mixed>() : T { return (this.#viewModel : any); }

    get<T : mixed>(key : string) : ?T {
        return (this.#variables.get(key) : any);
    }
    getObservable<T : mixed>(key : string) : rxjs$Observable<?T> {
        return this.#variables
            .actions
            .pipe(map(action => {
                const value = action.map.get(key);
                return ((value : any) : ?T);
            }));
    }

    getAll() : Map<string,mixed> {
        return new Map(this.#variables.entries());
    }
    getAllObservable() : rxjs$Observable<MapAction<string,mixed>> {
        return this.#variables.actions;
    }

    set(key : string, value : mixed) : void {
        this.#variables.set(key, value);
    }

    createChild() : ModelContext { return new ChildModelContext(this); }

    constructor(viewModel : mixed) {
        this.#viewModel = viewModel;
        this.#variables = new ObservableMap<string,mixed>();
    }
}
