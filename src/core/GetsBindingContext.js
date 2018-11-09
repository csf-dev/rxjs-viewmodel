//@flow
import { Binding, BindingContext } from '../binding';

export interface GetsBindingContext {
    getContext(element : HTMLElement,
               binding : Binding<mixed>,
               allBindings : Array<Binding<mixed>>) : BindingContext<mixed>;
}
