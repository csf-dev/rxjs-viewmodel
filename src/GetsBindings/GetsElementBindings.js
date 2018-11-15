//@flow
import type { ElementBinding } from './ElementBinding';

export interface GetsElementBindings {
    getBindings(element : HTMLElement) : Promise<ElementBinding>;
};