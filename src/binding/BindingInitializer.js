//@flow
import type { InitializationOptions } from './InitializationOptions';
import getOptionsCompleter from './GetsCompleteInitializationOptions';

export interface InitializesBinding {
    initialize(options : InitializationOptions) : void
}

export class BindingInitializer implements InitializesBinding {
    initialize(options : InitializationOptions) {
        const completedOptions = getOptionsCompleter().getCompleteOptions(options);
        throw new Error('Not implemented yet');
    }
}

const staticInitializer = new BindingInitializer();

export default function getInitializer() : InitializesBinding {
    return staticInitializer;
}