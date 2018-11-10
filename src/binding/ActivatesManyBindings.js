//@flow
import ActivatedBinding from './ActivatedBinding';
import type { ContextualBinding } from './ContextualBinding';

export interface ActivatesManyBindings {
    activateAll(contextualBindings : Array<ContextualBinding<mixed>>) : Array<Promise<ActivatedBinding<mixed>>>;
}
