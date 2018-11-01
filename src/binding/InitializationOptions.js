//@flow
import { GetsBindings } from "./GetsBindings";
import { GetsCompleteInitializationOptions } from './GetsCompleteInitializationOptions';
import { CreatesBindingContexts } from '../context/BindingContextFactory';

type MandatoryOptions<TViewModel : {}> = {
    viewModel : TViewModel
}

export type InitializationOptions<TViewModel> = MandatoryOptions<TViewModel> & {
    element? : HTMLElement,
    optionsCompleter? : GetsCompleteInitializationOptions,
    bindingContextProvider? : CreatesBindingContexts,
    bindingProvider? : GetsBindings,
};

export type CompleteInitialzationOptions<TViewModel> = MandatoryOptions<TViewModel> & {
    element : HTMLElement,
    bindingContextProvider : CreatesBindingContexts,
    bindingProvider : GetsBindings,
};