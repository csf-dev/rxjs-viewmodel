//@flow
import type { InitializationOptions, CompleteInitialzationOptions } from './InitializationOptions';

export interface GetsCompleteInitializationOptions {
    getCompleteOptions<TViewModel:{}>(options : InitializationOptions<TViewModel>) : CompleteInitialzationOptions<TViewModel>;
}

export class InitializationOptionsCompleter implements GetsCompleteInitializationOptions {
    getCompleteOptions<TViewModel:{}>(options : InitializationOptions<TViewModel>) : CompleteInitialzationOptions<TViewModel> {
        return {
            viewModel: options.viewModel,
            bindingProvider: options.bindingProvider,
            element: options.element || window.document.body
        };
    }
}

const staticCompleter = new InitializationOptionsCompleter();

export default function getOptionsCompleter() : GetsCompleteInitializationOptions { return staticCompleter; }
