//@flow
import { BindingDeclaration } from '../binding';
import { GetsBindings } from '.';
import { GetsElementBindings } from './GetsElementBindings';
import getElementProvider, { GetsAllHTMLElements } from './ElementProvider';
import type { ElementBinding } from './ElementBinding';
import type { ElementsWithBindingDeclarations} from '../binding'
import type { BindingOptions } from '../options';
import { UnobtrusiveBindingsProvider } from './Unobtrusive/UnobtrusiveBindingsProvider';

export class BindingsProvider implements GetsBindings {
    #elementBindingsProvider : GetsElementBindings;
    #elementsProvider : GetsAllHTMLElements;

    getBindings(element : HTMLElement) : Promise<ElementsWithBindingDeclarations> {
        const allElements = this.#elementsProvider.getAllElements(element);

        const elementBindingPromises = allElements
            .map(ele => this.#elementBindingsProvider.getBindings(ele));

        return Promise.all(elementBindingPromises);
    }

    constructor(elementBindingsProvider : GetsElementBindings, elementsProvider : GetsAllHTMLElements) {
        this.#elementBindingsProvider = elementBindingsProvider;
        this.#elementsProvider = elementsProvider;
    }
}

export default function getBindingsProvider(elementBindingsProvider : GetsElementBindings,
                                            elementsProvider : GetsAllHTMLElements) : GetsBindings {
    return new BindingsProvider(elementBindingsProvider, elementsProvider);
}
