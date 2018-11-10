//@flow
import Binding from './Binding';

export interface GetsBindings {
    getBindings(element : HTMLElement) : Promise<Map<HTMLElement,Array<Binding<mixed>>>>
}
