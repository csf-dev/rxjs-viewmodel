//@flow

export interface ReadsDataContext {
    getRoot<T>() : T;
    get<T>(key : string) : ?T;
    getKeys() : Array<string>;
}

export interface WritesDataContext {
    set(key : string, value : mixed) : void;
}

export default class DataContext implements ReadsDataContext, WritesDataContext {
    #root : mixed;
    #valueMap : Map<string,mixed>;

    getRoot<T>() : T { return (this.#root : any); }
    get<T>(key : string) : ?T {
        if(!this.#valueMap.has(key)) return undefined;
        return (this.#valueMap.get(key) : any);
    }
    getKeys() : Array<string> { return Array.from(this.#valueMap.keys()); }
    set(key : string, value : mixed) : void { this.#valueMap.set(key, value); }
    getChild() : DataContext {
        const child = new DataContext(this.#root);
        this.#valueMap.forEach((val, key, map) => child.set(key, val));
        return child;
    }

    constructor(root : mixed) {
        this.#root = root;
        this.#valueMap = new Map();
    }
}