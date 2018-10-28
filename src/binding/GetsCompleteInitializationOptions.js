//@flow
import type { InitializationOptions, CompleteInitialzationOptions } from './InitializationOptions';

export interface GetsCompleteInitializationOptions {
    getCompleteOptions(options : InitializationOptions) : CompleteInitialzationOptions;
}

export class InitializationOptionsCompleter implements GetsCompleteInitializationOptions {
    getCompleteOptions(options : InitializationOptions) : CompleteInitialzationOptions {
        return {
            viewModel: options.viewModel,
            bindingProvider: options.bindingProvider,
            element: options.element || window.document.body
        };
    }
}

const staticCompleter = new InitializationOptionsCompleter();

export default function getOptionsCompleter() : GetsCompleteInitializationOptions { return staticCompleter; }
