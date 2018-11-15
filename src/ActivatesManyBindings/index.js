//@flow
import { LiveBinding } from '../binding';
import type { ActivatableBinding } from '../binding';

export interface ActivatesManyBindings {
    activateAll(contextualBindings : Array<ActivatableBinding<mixed>>) : Array<Promise<LiveBinding<mixed>>>;
}
