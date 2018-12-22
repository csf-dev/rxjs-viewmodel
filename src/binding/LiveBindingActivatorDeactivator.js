//@flow
import { ActivatesAndDeactivatesBinding } from './ActivatesAndDeactivatesBinding';
import { StatefulBinding } from './LiveBinding';
import { DeactivatesBinding } from './DeactivatesBinding';

export class LiveBindingActivatorDeactivator implements ActivatesAndDeactivatesBinding {
    async activate(binding : StatefulBinding<mixed>) {
        return await binding.activator.activate(binding.context);
    }

    async deactivate(binding : StatefulBinding<mixed>, deactivator : DeactivatesBinding) {
        const deactivated = await deactivator.deactivate();
        return Promise.resolve();
    }
}