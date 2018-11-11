//@flow
import { Binding } from '../binding';

export interface GetsBindings {
    getBindings(element : HTMLElement) : Promise<Map<HTMLElement,Array<Binding<mixed>>>>;
}
