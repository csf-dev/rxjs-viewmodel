//@flow
import { StatefulBinding } from './LiveBinding';
import { LiveBindingActivatorDeactivator } from './LiveBindingActivatorDeactivator';
import { ElementAttachingActivatorDeactivatorDecorator } from './ElementAttachingActivatorDeactivatorDecorator';

export interface ActivatesAndDeactivatesBinding {
    activate(binding : StatefulBinding<mixed>) : Promise<bool>;
    deactivate(binding : StatefulBinding<mixed>) : Promise<bool>;
}

function createActivatorDeactivator() : ActivatesAndDeactivatesBinding {
    const baseActivator = new LiveBindingActivatorDeactivator();
    const elementAttachingDecorator = new ElementAttachingActivatorDeactivatorDecorator(baseActivator);
    return elementAttachingDecorator;
}

const singletonActivatorDeactivator = createActivatorDeactivator();

export default function getActivatorDeactivator() { return singletonActivatorDeactivator; }