//@flow
import type { InitializationOptions, CompleteInitialzationOptions } from './InitializationOptions';
import { getContextFactory } from '../context';
import { getProvider } from './attributeProvider';

export interface GetsCompleteInitializationOptions {
    getCompleteOptions<TViewModel:{}>(options : InitializationOptions<TViewModel>) : CompleteInitialzationOptions<TViewModel>;
}

export class InitializationOptionsCompleter implements GetsCompleteInitializationOptions {
    getCompleteOptions<TViewModel:{}>(options : InitializationOptions<TViewModel>) : CompleteInitialzationOptions<TViewModel> {
        return {
            viewModel: options.viewModel,
            bindingProvider: options.bindingProvider || getProvider(),
            element: options.element || window.document.body,
            bindingContextProvider: options.bindingContextProvider || getContextFactory()
        };
    }
}

const staticCompleter = new InitializationOptionsCompleter();

export default function getOptionsCompleter() : GetsCompleteInitializationOptions { return staticCompleter; }
