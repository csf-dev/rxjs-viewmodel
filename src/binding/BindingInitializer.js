//@flow
import type { InitializationOptions, CompleteInitialzationOptions } from './InitializationOptions';
import getOptionsCompleter from './GetsCompleteInitializationOptions';
import { getContextFactory, BindingContext } from '../context';

function createRootContext<TViewModel:{}>(data : TViewModel) : BindingContext<TViewModel,TViewModel> {
    const contextFactory = getContextFactory();
    return contextFactory.createRootContext(data);
}

export interface InitializesBinding {
    initialize<TViewModel:{}>(options : InitializationOptions<TViewModel>) : void
}

export class BindingInitializer implements InitializesBinding {
    initialize<TViewModel:{}>(options : InitializationOptions<TViewModel>) {
        const completedOptions : CompleteInitialzationOptions<TViewModel> = getOptionsCompleter().getCompleteOptions(options);
        const context : BindingContext<TViewModel,TViewModel> = createRootContext(completedOptions.viewModel);
        throw new Error('Not implemented yet');
    }
}

const staticInitializer = new BindingInitializer();

export default function getInitializer() : InitializesBinding {
    return staticInitializer;
}