//@flow
import type { InitializationOptions, CompleteInitialzationOptions } from './InitializationOptions';
import getOptionsCompleter from './GetsCompleteInitializationOptions';
import { ParameterError } from '../errors';

function getCompletedOptions<TViewModel:{}>(options : InitializationOptions<TViewModel>) : CompleteInitialzationOptions<TViewModel> {
    const optionsCompleter = options.optionsCompleter ||  getOptionsCompleter();
    return optionsCompleter.getCompleteOptions(options);
}

export interface InitializesBinding {
    initialize<TViewModel:{}>(options : InitializationOptions<TViewModel>) : void
}

export class BindingInitializer implements InitializesBinding {
    initialize<TViewModel:{}>(options : InitializationOptions<TViewModel>) {
        if(!options) throw new ParameterError('options', 'The options are mandatory.');
        const opts = getCompletedOptions(options);

        const context = opts.bindingContextProvider.createRootContext(opts.viewModel);
        throw new Error('Not implemented yet');
    }
}

const staticInitializer = new BindingInitializer();

export default function getInitializer() : InitializesBinding {
    return staticInitializer;
}