//@flow
import { ProvidesBindingDom } from './BindingDom';
import getPlaceholder from './ElementPlaceholder'
import { MissingBrowserError } from '../errors/MissingBrowserError';
import getSubstitutor, { ReplacesElementWithSubstitute } from './DomSubstitutor';

describe('The DOM substitutor', () => {
    let container : HTMLElement;
    let sut : ReplacesElementWithSubstitute;
    const getBindingDom = (markup : string) => createBindingDom(getElement(markup, container));

    beforeEach(() => {
        const body = getDocumentBody();
        container = document.createElement('div');
        body.appendChild(container);
        sut = getSubstitutor();
    });

    afterEach(() => {
        const body = getDocumentBody();
        if(container) body.removeChild(container);
    });

    describe('when removing an element', () => {
        it('should be able to replace a single empty element', () => {
            const dom = getBindingDom('<input type="text">');
            sut.replaceElementWithSubstitute(dom);
            expect(container.innerHTML).toEqual('<!-- Placeholder: <INPUT> -->');
        });

        it('should be able to replace an empty element which has content before and after', () => {
            const dom = getBindingDom('Before content<input type="text">After content');
            sut.replaceElementWithSubstitute(dom);
            expect(container.innerHTML).toEqual('Before content<!-- Placeholder: <INPUT> -->After content');
        });

        it('should be able to replace an element with text content', () => {
            const dom = getBindingDom('<strong>This text is important</strong>');
            sut.replaceElementWithSubstitute(dom);
            expect(container.innerHTML).toEqual('<!-- Placeholder: <STRONG> -->');
        });

        it('should be able to replace an element with text content which has content before and after', () => {
            const dom = getBindingDom('It is very <strong>important</strong> that substitution works correctly.');
            sut.replaceElementWithSubstitute(dom);
            expect(container.innerHTML).toEqual('It is very <!-- Placeholder: <STRONG> --> that substitution works correctly.');
        });

        it('should be able to replace an element with complex content', () => {
            const dom = getBindingDom('<p>This is a phrase of text <em>with some emphasised content</em> which we will be replacing.</p>');
            sut.replaceElementWithSubstitute(dom);
            expect(container.innerHTML).toEqual('<!-- Placeholder: <P> -->');
        });

        it('should be able to replace an element with complex content which also has content before and after', () => {
            const dom = getBindingDom('Here\'s some earlier text.<p>This is a phrase of text <em>with some emphasised content</em> which we will be replacing.</p>Here\'s some later text.');
            sut.replaceElementWithSubstitute(dom);
            expect(container.innerHTML).toEqual('Here\'s some earlier text.<!-- Placeholder: <P> -->Here\'s some later text.');
        });
    });

    describe('when restoring a removed element', () => {
        it('should be able to restore a single empty element', () => {
            const markup = '<input type="text">';
            removeThenRestoreElement(markup);
            expect(container.innerHTML).toEqual(markup);
        });

        it('should be able to restore an empty element which has content before and after', () => {
            const markup = 'Before content<input type="text">After content';
            removeThenRestoreElement(markup);
            expect(container.innerHTML).toEqual(markup);
        });

        it('should be able to restore an element with text content', () => {
            const markup = '<strong>This text is important</strong>';
            removeThenRestoreElement(markup);
            expect(container.innerHTML).toEqual(markup);
        });

        it('should be able to restore an element with text content which has content before and after', () => {
            const markup = 'It is very <strong>important</strong> that substitution works correctly.';
            removeThenRestoreElement(markup);
            expect(container.innerHTML).toEqual(markup);
        });

        it('should be able to restore an element with complex content', () => {
            const markup = '<p>This is a phrase of text <em>with some emphasised content</em> which we will be replacing.</p>';
            removeThenRestoreElement(markup);
            expect(container.innerHTML).toEqual(markup);
        });

        it('should be able to restore an element with complex content which also has content before and after', () => {
            const markup = 'Here\'s some earlier text.<p>This is a phrase of text <em>with some emphasised content</em> which we will be replacing.</p>Here\'s some later text.';
            removeThenRestoreElement(markup);
            expect(container.innerHTML).toEqual(markup);
        });

        function removeThenRestoreElement(markup : string) : void {
            const dom = getBindingDom(markup);
            sut.replaceElementWithSubstitute(dom);
            dom.remove = true;
            sut.restoreElement(dom)
        }
    });

    describe('when omitting an element\'s start/end tags', () => {
        it('should be able to omit a single empty element', () => {
            const dom = getBindingDom('<input type="text">');
            sut.replaceTagsWithSubstitute(dom);
            expect(container.innerHTML).toEqual('<!-- Placeholder: Open <INPUT> --><!-- Placeholder: Close <INPUT> -->');
        });

        it('should be able to omit an empty element which has content before and after', () => {
            const dom = getBindingDom('Before content<input type="text">After content');
            sut.replaceTagsWithSubstitute(dom);
            expect(container.innerHTML).toEqual('Before content<!-- Placeholder: Open <INPUT> --><!-- Placeholder: Close <INPUT> -->After content');
        });

        it('should be able to omit an element with text content', () => {
            const dom = getBindingDom('<strong>This text is important</strong>');
            sut.replaceTagsWithSubstitute(dom);
            expect(container.innerHTML).toEqual('<!-- Placeholder: Open <STRONG> -->This text is important<!-- Placeholder: Close <STRONG> -->');
        });

        it('should be able to omit an element with text content which has content before and after', () => {
            const dom = getBindingDom('It is very <strong>important</strong> that substitution works correctly.');
            sut.replaceTagsWithSubstitute(dom);
            expect(container.innerHTML).toEqual('It is very <!-- Placeholder: Open <STRONG> -->important<!-- Placeholder: Close <STRONG> --> that substitution works correctly.');
        });

        it('should be able to omit an element with complex content', () => {
            const dom = getBindingDom('<p>This is a phrase of text <em>with some emphasised content</em> which we will be replacing.</p>');
            sut.replaceTagsWithSubstitute(dom);
            expect(container.innerHTML).toEqual('<!-- Placeholder: Open <P> -->This is a phrase of text <em>with some emphasised content</em> which we will be replacing.<!-- Placeholder: Close <P> -->');
        });

        it('should be able to omit an element with complex content which also has content before and after', () => {
            const dom = getBindingDom('Here\'s some earlier text.<p>This is a phrase of text <em>with some emphasised content</em> which we will be replacing.</p>Here\'s some later text.');
            sut.replaceTagsWithSubstitute(dom);
            expect(container.innerHTML).toEqual('Here\'s some earlier text.<!-- Placeholder: Open <P> -->This is a phrase of text <em>with some emphasised content</em> which we will be replacing.<!-- Placeholder: Close <P> -->Here\'s some later text.');
        });
    });
    
    describe('when omitting and then restoring an element\'s start/end tags', () => {
        it('should be able to omit-then-restore a single empty element', () => {
            const markup = '<input type="text">';
            omitThenRestoreTags(markup);
            expect(container.innerHTML).toEqual(markup);
        });

        it('should be able to omit-then-restore an empty element which has content before and after', () => {
            const markup = 'Before content<input type="text">After content';
            omitThenRestoreTags(markup);
            expect(container.innerHTML).toEqual(markup);
        });

        it('should be able to omit-then-restore an element with text content', () => {
            const markup = '<strong>This text is important</strong>';
            omitThenRestoreTags(markup);
            expect(container.innerHTML).toEqual(markup);
        });

        it('should be able to omit-then-restore an element with text content which has content before and after', () => {
            const markup = 'It is very <strong>important</strong> that substitution works correctly.';
            omitThenRestoreTags(markup);
            expect(container.innerHTML).toEqual(markup);
        });

        it('should be able to omit-then-restore an element with complex content', () => {
            const markup = '<p>This is a phrase of text <em>with some emphasised content</em> which we will be replacing.</p>';
            omitThenRestoreTags(markup);
            expect(container.innerHTML).toEqual(markup);
        });

        it('should be able to omit-then-restore an element with complex content which also has content before and after', () => {
            const markup = 'Here\'s some earlier text.<p>This is a phrase of text <em>with some emphasised content</em> which we will be replacing.</p>Here\'s some later text.';
            omitThenRestoreTags(markup);
            expect(container.innerHTML).toEqual(markup);
        });

        function omitThenRestoreTags(markup : string) : void {
            const dom = getBindingDom(markup);
            sut.replaceTagsWithSubstitute(dom);
            dom.omitTag = true;
            sut.restoreTags(dom);
        }
    });
});

function getDocumentBody() : HTMLBodyElement {
    if(!document.body) throw new MissingBrowserError('A document body element is required.');
    return document.body;
}

function getElement(markup : string, container : HTMLElement) : HTMLElement {
    container.innerHTML = markup;
    const output = Array.from(container.childNodes).find(item => item instanceof HTMLElement);
    if(!output) throw new Error('You must provide markup which contains at least one HTML element');
    if(!(output instanceof HTMLElement)) throw new Error('Error in test logic');
    return output;
}

function createBindingDom(element : HTMLElement) : ProvidesBindingDom {
    const placeholder = getPlaceholder(element);
    return {
        element: element,
        placeholder: placeholder,
        isBindingRoot: false,
        omitTag: false,
        remove: false
    };
}