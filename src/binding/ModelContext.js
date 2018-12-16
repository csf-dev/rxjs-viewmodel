//@flow
import { MapAction } from "rxjs-observable-collections";
import { RootModelContext } from './RootModelContext';

export interface ModelContext {
    +keys : Iterator<string>;
    +observableKeys : rxjs$Observable<Array<string>>;

    getVm<T : mixed>() : T;

    getOnce<T : mixed>(key : string) : ?T;
    get<T : mixed>(key : string) : rxjs$Observable<?T>;

    getAllOnce() : Map<string,mixed>;
    getAll() : rxjs$Observable<MapAction<string,mixed>>;

    set(key : string, value : mixed) : void;

    createChild() : ModelContext;
}

export default function getModelContext(viewModel : mixed) : ModelContext {
    return new RootModelContext(viewModel);
}
