//@flow
import { ActivatesAndDeactivatesBinding } from './ActivatesAndDeactivatesBinding';
import { StatefulBinding } from './LiveBinding';

export class LiveBindingActivatorDeactivator implements ActivatesAndDeactivatesBinding {
    activate(binding : StatefulBinding<mixed>) {
        return Promise.resolve(binding.activator.activate(binding.context))
            .then(undef => Promise.resolve(true));
    }

    deactivate(binding : StatefulBinding<mixed>) {
        if(!binding.activator.deactivate) return Promise.resolve(false);

        return Promise.resolve(binding.activator.deactivate(binding.context))
            .then(undef => Promise.resolve(true));
    }
}