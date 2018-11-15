//@flow
import { BindingDeclaration } from '../binding';

export interface GetsBindings {
    getBindings(element : HTMLElement) : Promise<Map<HTMLElement,Array<BindingDeclaration<mixed>>>>;
}