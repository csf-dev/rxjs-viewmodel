//@flow
import type { MaybeBindingOptions, BindingOptions } from './BindingOptions';

export interface GetsBindingOptions {
    getOptions(opts? : MaybeBindingOptions) : BindingOptions
}