//@flow
import { GetsElementBindings } from '../GetsElementBindings';
import type { UnobtrusiveBindingDefinition } from './UnobtrusiveBindingDefinition';
import type { BindingDefinition } from '../BindingDefinition';
import type { BindingOptions } from '../../options';
import { BindingDeclaration } from '../../binding';
import { BindingActivator } from '../../binding/BindingActivator';
import { GetsBindingActivator } from '../../GetsBindingActivator';
import type { ActivatorIdentifier } from '../../GetsBindingActivator';
import type { ElementBinding } from '../ElementBinding';

export class UnobtrusiveBindingsProvider implements GetsElementBindings {
    #definitions : Array<UnobtrusiveBindingDefinition>;
    #activatorFactory : GetsBindingActivator;

    getBindings(element : HTMLElement) : Promise<ElementBinding> {
        const bindingDefs = getMatchingBindingDefinitions(this.#definitions, element);
        const bindingPromises = bindingDefs.map(def => getBinding(def, this.#activatorFactory));
        return Promise.all(bindingPromises)
            .then(bindings => { return { element, bindings }; });
    }

    constructor(definitions : Array<UnobtrusiveBindingDefinition>, activatorFactory : GetsBindingActivator) {
        this.#definitions = definitions;
        this.#activatorFactory = activatorFactory;
    }
}

function reduceUnotrusiveDefinition(accumulator : Array<BindingDefinition<mixed>>,
                                    current : UnobtrusiveBindingDefinition) : Array<BindingDefinition<mixed>> {
    const bindings : Array<BindingDefinition<mixed>>
        = Array.isArray(current.bindings)? current.bindings : [current.bindings];
    
    accumulator.push(...bindings)
    return accumulator;
}

function getMatchingBindingDefinitions(definitions : Array<UnobtrusiveBindingDefinition>,
                                       element : HTMLElement) : Array<BindingDefinition<mixed>> {
    return definitions
        .filter(def => element.matches(def.selector))
        .reduce(reduceUnotrusiveDefinition, []);
}

function getActivator(identifier : ActivatorIdentifier<mixed>,
                      activatorFactory : GetsBindingActivator) : Promise<BindingActivator<mixed>> {
    if(typeof identifier !== 'string') return Promise.resolve(identifier);
    return activatorFactory.getActivator(identifier);
}

function getBinding(def : BindingDefinition<mixed>,
                    activatorFactory : GetsBindingActivator) : Promise<BindingDeclaration<mixed>> {
    return getActivator(def.activator, activatorFactory)
        .then(activator => Promise.resolve(new BindingDeclaration(activator, def.paramsProvider)));
}