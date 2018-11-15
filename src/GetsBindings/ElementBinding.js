//@flow
import { BindingDeclaration } from '../binding';

export type ElementBinding = { element: HTMLElement, bindings: Array<BindingDeclaration<mixed>> };