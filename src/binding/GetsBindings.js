//@flow
import type { Binding } from './Binding';

export interface GetsBindings {
    getBindings(element : HTMLElement) : Array<Binding>;
}