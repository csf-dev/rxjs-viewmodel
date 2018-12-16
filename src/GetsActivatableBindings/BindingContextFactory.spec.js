//@flow
import { BindingContextFactory } from './BindingContextFactory';
import { GetsBindingContext } from './GetsBindingContext';
import { BindingDeclaration, BindingContext, BindingActivator } from '../binding';
import getModelContext, { ModelContext } from '../binding/ModelContext';

describe('The binding context factory.', () => {
    let model : ModelContext;
    const sut : GetsBindingContext = new BindingContextFactory();

    beforeEach(() => {
        model = getModelContext({ myNumber: 4 });
    });

    it('should return a promise which resolves to a BindingContext', async () => {
        const result = await sut.getContext(getElement(),
                                            getBinding(ctx => ctx.getViewModel<{myNumber:number}>().myNumber),
                                            [],
                                            model);

        expect(result instanceof BindingContext).toBe(true);
    });

    it('should expose the correct parameters value in the returned binding context', async () => {
        const result = await sut.getContext(getElement(),
                                            getBinding(ctx => ctx.getViewModel<{myNumber:number}>().myNumber + 1),
                                            [],
                                            model);

        expect(result.parameters).toEqual(5);
    });

    it('should be able to read parameters from the model context', async () => {
        model.set('num', 22);
        const result = await sut.getContext(getElement(),
                                            getBinding(ctx => ctx.get('num') || 0),
                                            [],
                                            model);

        expect(result.parameters).toEqual(22);
    });

    it('should not throw if reading parameters fails', async () => {
        model.set('num', 22);
        const result = await sut.getContext(getElement(),
                                            getBinding(ctx => { throw new Error('Test error') }),
                                            [],
                                            model);

        expect(result.parameters).toBeUndefined();
    });

    it('should pass all bindings to the resultant context', async () => {
        const otherBinding = getBinding(x => 1);
        const allBindings = [ otherBinding ];
        const result = await sut.getContext(getElement(),
                                            getBinding(ctx => ctx.get('num') || 0),
                                            allBindings,
                                            model);

        expect(result.getAllBindings()).toEqual(allBindings);
    });
});

function getElement() : HTMLElement { return document.createElement('div'); }

function getActivator() : BindingActivator<number> {
    return {
        name: 'foo',
        activate: function(ctx : BindingContext<number>) { return Promise.resolve(undefined); }
    }
}

function getBinding(parametersFunc : (ctx : ModelContext) => number) : BindingDeclaration<number> {
    return new BindingDeclaration(getActivator(), parametersFunc);
}