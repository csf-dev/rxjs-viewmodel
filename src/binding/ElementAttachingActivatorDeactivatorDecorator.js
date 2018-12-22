//@flow
import { ActivatesAndDeactivatesBinding } from './ActivatesAndDeactivatesBinding';
import { StatefulBinding } from './LiveBinding';
import { DeactivatesBinding } from './DeactivatesBinding';

export class ElementAttachingActivatorDeactivatorDecorator implements ActivatesAndDeactivatesBinding {
    #wrapped : ActivatesAndDeactivatesBinding;

    async activate(binding : StatefulBinding<mixed>) {
        const wrappedResult = await this.#wrapped.activate(binding);
        attachToElement(binding);
        return wrappedResult;
    }

    async deactivate(binding : StatefulBinding<mixed>, deactivator : DeactivatesBinding) {
        const wrappedResult = await this.#wrapped.deactivate(binding, deactivator);
        detachFromElement(binding);
        return Promise.resolve(wrappedResult);
    }

    constructor(wrapped : ActivatesAndDeactivatesBinding) {
        this.#wrapped = wrapped;
    }
}

function attachToElement(binding : StatefulBinding<mixed>) {
    const element = binding.context.dom.element;
    const bindingProvider = getActiveBindingProvider(element);
    bindingProvider.activeBindings.push(binding);
}

function detachFromElement<TParams : mixed>(binding : StatefulBinding<TParams>) {
    const element = binding.context.dom.element;
    const bindingProvider = getActiveBindingProvider(element);
    bindingProvider.activeBindings = bindingProvider.activeBindings.filter(item => item !== binding);
}

type HasActiveBindings = { activeBindings : Array<StatefulBinding<mixed>> };

function getActiveBindingProvider(element : HTMLElement) : HasActiveBindings {
    const unsafeElement : any = element;
    if(!Array.isArray(unsafeElement.activeBindings))
        unsafeElement.activeBindings = [];
    return unsafeElement;
}