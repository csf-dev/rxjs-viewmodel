//@flow
import { Binding } from '../binding';

export interface GetsElementBindings {
    getBindings(element : HTMLElement) : Array<Binding<mixed>>;
};