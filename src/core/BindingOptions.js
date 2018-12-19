//@flow
import { GetsBindings } from '../GetsBindings';
import { GetsActivatableBindings } from '../GetsActivatableBindings';
import { ActivatesManyBindings } from '../ActivatesManyBindings';
import { GetsAllHTMLElements } from '../GetsBindings/ElementProvider';
import { GetsElementBindings } from '../GetsBindings/GetsElementBindings';
import { GetsBindingActivator } from '../GetsBindingActivator';
import type { UnobtrusiveBindingDefinition } from '../GetsBindings/Unobtrusive/UnobtrusiveBindingDefinition';

const optionNames = {
    bindingsProvider: 'bindingsProvider',
    activatableBindingsProvider: 'activatableBindingsProvider',
    bulkBindingActivator: 'bulkBindingActivator',
    elementProvider: 'elementProvider',
    elementBindingProvider: 'elementBindingProvider',
    bindingActivatorProvider: 'bindingActivatorProvider',
    bindingDefinitions: 'bindingDefinitions',
};
Object.freeze(optionNames);
export { optionNames };


export default class BindingOptions {
    #options : Map<string,mixed>;

    get bindingsProvider() : ?GetsBindings {
        return (this.#options.get(optionNames.bindingsProvider) : any);
    }

    get activatableBindingsProvider() : ?GetsActivatableBindings {
        return (this.#options.get(optionNames.activatableBindingsProvider) : any);
    }

    get bulkBindingActivator() : ?ActivatesManyBindings  {
        return (this.#options.get(optionNames.bulkBindingActivator) : any);
    }
    
    get elementProvider() : ?GetsAllHTMLElements {
        return (this.#options.get(optionNames.elementProvider) : any);
    }
    
    get elementBindingProvider() : ?GetsElementBindings {
        return (this.#options.get(optionNames.elementBindingProvider) : any);
    }

    get bindingActivatorProvider() : ?GetsBindingActivator {
        return (this.#options.get(optionNames.bindingActivatorProvider) : any);
    }

    get bindingDefinitions() : Array<UnobtrusiveBindingDefinition> {
        return (this.#options.get(optionNames.bindingDefinitions) : any) || [];
    }

    get<T>(key : string) : ?T { return (this.#options.get(key) : any); }

    constructor(source : {}) {
        this.#options = mapFromObject(source);
    }
}

function mapFromObject(source : {}) : Map<string,mixed> {
    const keys : Array<string> = Object.getOwnPropertyNames(source);
    const vals : Array<[string,mixed]> = keys.map(x => [x, source[x]]);
    return new Map<string,mixed>(vals);
}