//@flow
import { GetsBindings } from "./GetsBindings";

type MandatoryOptions = {
    viewModel : {},
    bindingProvider : GetsBindings
}

export type InitializationOptions = MandatoryOptions & {
    element? : HTMLElement,
};

export type CompleteInitialzationOptions = MandatoryOptions & {
    element : HTMLElement,
};