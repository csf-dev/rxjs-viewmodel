//@flow
import { BindingDeclaration, BindingContext } from '../binding';
import { ModelContext } from '../binding/ModelContext';
import type { BindingOptions } from '../options';

export interface GetsBindingContext {
    getContext<T : mixed>(element : HTMLElement,
                          binding : BindingDeclaration<T>,
                          allBindings : Array<BindingDeclaration<mixed>>,
                          modelContext : ModelContext,
                          options : BindingOptions) : BindingContext<?T>;
}
