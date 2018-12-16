//@flow
import { ModelContext } from '../binding/ModelContext';

export class ModelContextCache {
    #modelsCache : Map<HTMLElement,ModelContext>;
    #rootModel : ModelContext;

    getModel(element : HTMLElement) {
        if(!this.#modelsCache.has(element)) {
            const parentElement : HTMLElement = (element.parentElement : any);
            const parentModel = this.#modelsCache.get(parentElement);
            const model = parentModel? parentModel.createChild() : this.#rootModel;

            this.#modelsCache.set(element, model);
        }

        // This cast is safe because we have ensured that the context is in the map
        return (this.#modelsCache.get(element) : any);
    }

    constructor(rootModel : ModelContext) {
        this.#modelsCache = new Map<HTMLElement,ModelContext>();
        this.#rootModel = rootModel;
    }
}
