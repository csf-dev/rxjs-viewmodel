//@flow
import { BindingActivator, BindingContext, DeactivatesBinding } from '../binding';
import type { ProvidesValue } from '../vm';
import { getObservableValue } from '../vm';

export class TextBindingActivator implements BindingActivator<ProvidesValue<string>> {
    get name() : string { return 'text'; };

    activate(ctx : BindingContext<ProvidesValue<string>>) : ?Promise<DeactivatesBinding> {
        const observable = getObservableValue(ctx.parameters);
        const sub = observable.subscribe(val => ctx.dom.element.innerText = val);

        const deactivator : DeactivatesBinding = {
            deactivate: () => {
                sub.unsubscribe();
                return Promise.resolve();
            }
        }
        return Promise.resolve(deactivator);
    }
}