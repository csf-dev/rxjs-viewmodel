//@flow
import { StatefulBinding } from './LiveBinding';
import { LiveBindingActivatorDeactivator } from './LiveBindingActivatorDeactivator';
import { ElementAttachingActivatorDeactivatorDecorator } from './ElementAttachingActivatorDeactivatorDecorator';
import { DeactivatesBinding } from './DeactivatesBinding';

export interface ActivatesAndDeactivatesBinding {
    activate(binding : StatefulBinding<mixed>) : Promise<?DeactivatesBinding>;
    deactivate(binding : StatefulBinding<mixed>, deactivator : DeactivatesBinding) : Promise<void>;
}

function createActivatorDeactivator() : ActivatesAndDeactivatesBinding {
    const baseActivator = new LiveBindingActivatorDeactivator();
    const elementAttachingDecorator = new ElementAttachingActivatorDeactivatorDecorator(baseActivator);
    return elementAttachingDecorator;
}

const singletonActivatorDeactivator = createActivatorDeactivator();

export default function getActivatorDeactivator() { return singletonActivatorDeactivator; }