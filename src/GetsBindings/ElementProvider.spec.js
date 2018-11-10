//@flow
import getElementProvider, { GetsAllHTMLElements, ElementProvider } from './ElementProvider';

describe('The element provider', () => {
    let sut : GetsAllHTMLElements;
    const testRoot : HTMLElement = document.createElement('div');
    if(document.body)
        document.body.appendChild(testRoot);

    beforeEach(() => {
        const children = Array.from(testRoot.childNodes);
        children.forEach(node => testRoot.removeChild(node));
        sut = getElementProvider();
    });

    it('should be able to return a single element', () => {
        const element = getElement('<div></div>');
        const result = sut.getAllElements(element);
        expect(result).toEqual([element]);
    });

    it('should ignore text within a single element', () => {
        const element = getElement('<div>This is some text</div>');
        const result = sut.getAllElements(element);
        expect(result).toEqual([element]);
    });

    it('should return nested nodes', () => {
        const element = getElement('<div><span>This is a nested node</span></div>');
        const span1 = element.children[0];
        const result = sut.getAllElements(element);
        expect(result).toEqual([element, span1]);
    });

    it('should return sibling nested nodes', () => {
        const element = getElement('<div><span>This is a nested node</span>Text between spans<span>This is another nested node</span></div>');
        const span1 = element.children[0];
        const span2 = element.children[1];
        const result = sut.getAllElements(element);
        expect(result).toEqual([element, span1, span2]);
    });

    it('should return deeply nested nodes in order of depth', () => {
        const element = getElement('<div><p><span><strong>Four levels deep</strong></span></p></div>');
        const div = element;
        const p = element.querySelector('p');
        const span = element.querySelector('span');
        const strong = element.querySelector('strong');
        const result = sut.getAllElements(element);
        expect(result).toEqual([div, p, span, strong]);
    });

    function getElement(markup : string) {
        testRoot.innerHTML = markup;
        if(testRoot.firstChild instanceof HTMLElement)
            return testRoot.firstChild;
        
        throw new Error('Invalid markup.');
    }
});

