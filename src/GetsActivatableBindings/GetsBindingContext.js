//@flow
import { BindingDeclaration, BindingContext } from '../binding';

export interface GetsBindingContext {
    getContext<T : mixed>(element : HTMLElement,
                          binding : BindingDeclaration<T>,
                          allBindings : Array<BindingDeclaration<mixed>>,
                          parentContext? : Promise<BindingContext<mixed>>) : Promise<BindingContext<?T>>;
}
