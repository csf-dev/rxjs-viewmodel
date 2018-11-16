//@flow
import { LiveBinding } from '../binding';
import type { ActivatableBinding } from '../binding';

export interface ActivatesManyBindings {
    activateAll(activatableBindings : Array<ActivatableBinding<mixed>>) : Array<Promise<LiveBinding<mixed>>>;
}
