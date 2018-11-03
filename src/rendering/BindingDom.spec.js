//flow
import getDom, { ProvidesBindingDom } from './BindingDom';

describe('The BindingDom service', () => {
    let container : HTMLElement;
    const getSut : (markup : string) => ProvidesBindingDom = (markup : string) => getDom(getElement(markup, container));

    beforeEach(() => {
        const body = getDocumentBody();
        container = document.createElement('div');
        body.appendChild(container);
    });

    afterEach(() => {
        const body = getDocumentBody();
        if(container) body.removeChild(container);
    });

    describe('has an omitTag property which', () => {
        it('should be able to remove an element\'s tags', () => {
            const sourceMarkup = 'Hello there <em>it is a fine day today</em>, isn\'t it?';
            const sut = getSut(sourceMarkup);
            sut.omitTag = true;
            expect(container.innerHTML).toBe('Hello there <!-- Placeholder: Open <EM> -->it is a fine day today<!-- Placeholder: Close <EM> -->, isn\'t it?');
        });

        it('should be able to restore an element\'s tags after removing them', () => {
            const sourceMarkup = 'Hello there <em>it is a fine day today</em>, isn\'t it?';
            const sut = getSut(sourceMarkup);
            sut.omitTag = true;
            sut.omitTag = false;
            expect(container.innerHTML).toBe(sourceMarkup);
        });

        it('should not malfunction if used to remove multiple times', () => {
            const sourceMarkup = 'Hello there <em>it is a fine day today</em>, isn\'t it?';
            const sut = getSut(sourceMarkup);
            sut.omitTag = true;
            sut.omitTag = true;
            sut.omitTag = true;
            sut.omitTag = true;
            expect(container.innerHTML).toBe('Hello there <!-- Placeholder: Open <EM> -->it is a fine day today<!-- Placeholder: Close <EM> -->, isn\'t it?');
        });

        it('should not malfunction if used to restore multiple times', () => {
            const sourceMarkup = 'Hello there <em>it is a fine day today</em>, isn\'t it?';
            const sut = getSut(sourceMarkup);
            sut.omitTag = true;
            sut.omitTag = false;
            sut.omitTag = false;
            sut.omitTag = false;
            expect(container.innerHTML).toBe(sourceMarkup);
        });
    });

    describe('has a remove property which', () => {
        it('should be able to remove an element', () => {
            const sourceMarkup = 'Hello there <em>it is a fine day today</em>, isn\'t it?';
            const sut = getSut(sourceMarkup);
            sut.remove = true;
            expect(container.innerHTML).toBe('Hello there <!-- Placeholder: <EM> -->, isn\'t it?');
        });

        it('should be able to restore an element after removing it', () => {
            const sourceMarkup = 'Hello there <em>it is a fine day today</em>, isn\'t it?';
            const sut = getSut(sourceMarkup);
            sut.remove = true;
            sut.remove = false;
            expect(container.innerHTML).toBe(sourceMarkup);
        });

        it('should not malfunction if used to remove multiple times', () => {
            const sourceMarkup = 'Hello there <em>it is a fine day today</em>, isn\'t it?';
            const sut = getSut(sourceMarkup);
            sut.remove = true;
            sut.remove = true;
            sut.remove = true;
            expect(container.innerHTML).toBe('Hello there <!-- Placeholder: <EM> -->, isn\'t it?');
        });

        it('should not malfunction if used to restore multiple times', () => {
            const sourceMarkup = 'Hello there <em>it is a fine day today</em>, isn\'t it?';
            const sut = getSut(sourceMarkup);
            sut.remove = true;
            sut.remove = false;
            sut.remove = false;
            expect(container.innerHTML).toBe(sourceMarkup);
        });
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
