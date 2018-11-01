//@flow
import { BindingContextFactory } from './BindingContextFactory';
import { BindingContext } from './BindingContext';

describe('The binding context factory', () => {
    let sut;

    beforeEach(() => {
        sut = new BindingContextFactory();
    })

    it('should create a root context with the correct current data', () => {
        const rootData = {};

        const result = sut.createRootContext(rootData);

        expect(result.current).toBe(rootData);
    });

    it('should create a root context with the correct root data', () => {
        const rootData = {};

        const result = sut.createRootContext(rootData);

        expect(result.root).toBe(rootData);
    });

    it('should create a child context with the correct current data', () => {
        const currentContext = new BindingContext({}, {});
        const newData = {};

        const result = sut.createChildContext(currentContext, newData);

        expect(result.current).toBe(newData);
    });

    it('should create a child context with the correct parent data', () => {
        const currentData = {};
        const currentContext = new BindingContext(currentData, {});

        const result = sut.createChildContext(currentContext, {});

        expect(result.parent).toBe(currentData);
    });

    it('should create a child context with the correct root data', () => {
        const rootData = {};
        const currentContext = new BindingContext({}, rootData);

        const result = sut.createChildContext(currentContext, {});

        expect(result.root).toBe(rootData);
    });
});