//@flow
import { ActivatesManyBindings } from './index';
import type { ActivatableBinding } from '../binding';
import { LiveBinding } from '../binding';

function getLiveBinding(activatableBinding : ActivatableBinding<mixed>) : LiveBinding<mixed> {
    if(!activatableBinding.context || !activatableBinding.binding)
        throw new Error('The input must have both a binding and a context.');
    return new LiveBinding(activatableBinding.context, activatableBinding.binding.activator);
}

export class BulkBindingActivator implements ActivatesManyBindings {
    activateAll(activatableBindings : Array<ActivatableBinding<mixed>>) : Array<Promise<LiveBinding<mixed>>> {
        return activatableBindings.map(binding => {
            const liveBinding = getLiveBinding(binding);
            return liveBinding.activate()
                .then(activated => Promise.resolve(liveBinding));
        });
    }
}