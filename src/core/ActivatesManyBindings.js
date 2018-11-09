//@flow
import { ActivatedBinding } from '../binding';
import type { ContextualBinding } from './ContextualBinding';

export interface ActivatesManyBindings {
    activateAll(contextualBindings : Array<ContextualBinding<mixed>>) : Array<Promise<ActivatedBinding<mixed>>>;
}
