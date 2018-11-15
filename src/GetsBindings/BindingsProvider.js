//@flow
import { BindingDeclaration } from '../binding';
import { GetsBindings } from '.';
import { GetsElementBindings } from './GetsElementBindings';
import { GetsAllHTMLElements } from './ElementProvider';
import type { ElementBinding } from './ElementBinding';

export class BindingsProvider implements GetsBindings {
    #elementBindingsProvider : GetsElementBindings;
    #elementsProvider : GetsAllHTMLElements;

    getBindings(element : HTMLElement) : Promise<Map<HTMLElement,Array<BindingDeclaration<mixed>>>> {
        const allElements = this.#elementsProvider.getAllElements(element);

        const elementBindingPromises = allElements
            .map(ele => this.#elementBindingsProvider.getBindings(ele));

        return Promise.all(elementBindingPromises)
            .then(elementBindings => new Map(elementBindings.map(item => [ item.element, item.bindings ])));
    }

    constructor(elementBindingsProvider : GetsElementBindings, elementsProvider : GetsAllHTMLElements) {
        this.#elementBindingsProvider = elementBindingsProvider;
        this.#elementsProvider = elementsProvider;
    }
}
