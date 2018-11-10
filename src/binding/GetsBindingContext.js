//@flow
import Binding from './Binding';
import BindingContext from './BindingContext';

export interface GetsBindingContext {
    getContext(element : HTMLElement,
               binding : Binding<mixed>,
               allBindings : Array<Binding<mixed>>) : BindingContext<mixed>;
}
