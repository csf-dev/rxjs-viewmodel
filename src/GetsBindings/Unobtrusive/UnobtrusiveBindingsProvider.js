//@flow
import { GetsElementBindings } from '../GetsElementBindings';
import type { UnobtrusiveBindingDefinition } from './UnobtrusiveBindingDefinition';
import type { BindingDefinition } from '../BindingDefinition';
import { BindingOptions } from '../../core';
import { Binding, BindingActivator } from '../../binding';
import getActivatorProvider, { GetsBindingActivator } from '../../GetsBindingActivator';
import type { ActivatorIdentifier } from '../../GetsBindingActivator';
import type { ElementBinding } from '../ElementBinding';

function getDefaultBindingActivatorProvider() { return getActivatorProvider(); }

function reduceUnotrusiveDefinition(accumulator : Array<BindingDefinition<mixed>>,
                                    current : UnobtrusiveBindingDefinition<mixed>) : Array<BindingDefinition<mixed>> {
    const bindings : Array<BindingDefinition<mixed>>
        = Array.isArray(current.bindings)? current.bindings : [current.bindings];
    
    accumulator.push(...bindings)
    return accumulator;
}

function getMatchingBindingDefinitions(definitions : Array<UnobtrusiveBindingDefinition<mixed>>,
                                       element : HTMLElement) : Array<BindingDefinition<mixed>> {
    return definitions
        .filter(def => element.matches(def.selector))
        .reduce(reduceUnotrusiveDefinition, []);
}

function getActivator(identifier : ActivatorIdentifier<mixed>,
                      activatorFactory : GetsBindingActivator) : BindingActivator<mixed> {
    if(typeof identifier !== 'string') return identifier;
    return activatorFactory.getActivator(identifier);
}

function getBinding(def : BindingDefinition<mixed>,
                    activatorFactory : GetsBindingActivator) : Binding<mixed> {
    const activator = getActivator(def.activator, activatorFactory);
    return new Binding(activator, def.paramsProvider);
}

export class UnobtrusiveBindingsProvider implements GetsElementBindings {
    #definitions : Array<UnobtrusiveBindingDefinition<mixed>>;
    #activatorFactory : GetsBindingActivator;

    getBindings(element : HTMLElement) : Promise<ElementBinding> {
        const bindingDefs = getMatchingBindingDefinitions(this.#definitions, element);
        const output = bindingDefs.map(def => getBinding(def, this.#activatorFactory));
        return Promise.resolve({element, bindings: output});
    }

    constructor(definitions : Array<UnobtrusiveBindingDefinition<mixed>>, options : BindingOptions) {
        this.#definitions = definitions;
        this.#activatorFactory = options.bindingActivatorProvider || getDefaultBindingActivatorProvider();
    }
}