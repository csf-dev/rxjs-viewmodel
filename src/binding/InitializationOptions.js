//@flow
import { GetsBindingDefinitions } from "./GetsBindingDefinitions";

type MandatoryOptions<TViewModel : {}> = {
    viewModel : TViewModel,
    bindingProvider : GetsBindingDefinitions
}

export type InitializationOptions<TViewModel> = MandatoryOptions<TViewModel> & {
    element? : HTMLElement,
};

export type CompleteInitialzationOptions<TViewModel> = MandatoryOptions<TViewModel> & {
    element : HTMLElement,
};