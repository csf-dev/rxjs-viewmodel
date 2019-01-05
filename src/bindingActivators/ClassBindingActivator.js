//@flow
import { BindingContext, DeactivatesBinding } from '../binding';
import { BindingActivator } from '../binding/BindingActivator';
import type { ProvidesValue } from '../vm';
import { getObservableValue } from '../vm';

export class ClassBindingActivator implements BindingActivator<ProvidesValue<string>> {
    get name() : string { return 'class'; };

    activate(ctx : BindingContext<ProvidesValue<string>>) : ?Promise<DeactivatesBinding> {
        const observable = getObservableValue(ctx.parameters);
        const sub = observable.subscribe(val => ctx.dom.element.className = val);

        const deactivator : DeactivatesBinding = {
            deactivate: () => {
                sub.unsubscribe();
                return Promise.resolve();
            }
        }
        return Promise.resolve(deactivator);
    }
}