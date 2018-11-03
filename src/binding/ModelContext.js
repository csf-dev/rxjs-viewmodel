//@flow

export default class ModelContext {
    #root : mixed;
    #valueMap : Map<string,mixed>;

    getRoot<T>() : T { return (this.#root : any); }
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

    constructor(root : mixed) {
        this.#root = root;
        this.#valueMap = new Map();
    }
}