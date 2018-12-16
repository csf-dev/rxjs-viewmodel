//@flow
import { BindingDeclaration } from '../binding';
import type { ElementsWithBindingDeclarations } from '../binding'
export type { ElementBinding } from './ElementBinding';

export interface GetsBindings {
    getBindings(element : HTMLElement) : Promise<ElementsWithBindingDeclarations>;
}