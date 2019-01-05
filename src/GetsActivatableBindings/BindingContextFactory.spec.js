//@flow
import { BindingContextFactory } from './BindingContextFactory';
import { GetsBindingContext } from './GetsBindingContext';
import { BindingDeclaration, BindingContext } from '../binding';
import { BindingActivator } from '../binding/BindingActivator';
import getModelContext, { ModelContext } from '../binding/ModelContext';
import { BindingOptionsFactory } from '../options/BindingOptionsFactory';

describe('The binding context factory.', () => {
    let model : ModelContext;
    const sut : GetsBindingContext = new BindingContextFactory();
    const optionsFactory = new BindingOptionsFactory();
    const options = optionsFactory.getOptions();

    beforeEach(() => {
        model = getModelContext({ myNumber: 4 });
    });

    it('should return a promise which resolves to a BindingContext', async () => {
        const result = await sut.getContext(getElement(),
                                            getBinding(ctx => ctx.getVm<{myNumber:number}>().myNumber),
                                            [],
                                            model,
                                            options);

        expect(result instanceof BindingContext).toBe(true);
    });

    it('should expose the correct parameters value in the returned binding context', async () => {
        const result = await sut.getContext(getElement(),
                                            getBinding(ctx => ctx.getVm<{myNumber:number}>().myNumber + 1),
                                            [],
                                            model,
                                            options);

        expect(result.parameters).toEqual(5);
    });

    it('should be able to read parameters from the model context', async () => {
        model.set('num', 22);
        const result = await sut.getContext(getElement(),
                                            getBinding(ctx => ctx.getOnce('num') || 0),
                                            [],
                                            model,
                                            options);

        expect(result.parameters).toEqual(22);
    });

    it('should not throw if reading parameters fails', async () => {
        model.set('num', 22);
        const result = await sut.getContext(getElement(),
                                            getBinding(ctx => { throw new Error('Test error') }),
                                            [],
                                            model,
                                            options);

        expect(result.parameters).toBeUndefined();
    });

    it('should pass all bindings to the resultant context', async () => {
        const otherBinding = getBinding(x => 1);
        const allBindings = [ otherBinding ];
        const result = await sut.getContext(getElement(),
                                            getBinding(ctx => ctx.getOnce('num') || 0),
                                            allBindings,
                                            model,
                                            options);

        expect(result.getAllBindings()).toEqual(allBindings);
    });
});

function getElement() : HTMLElement { return document.createElement('div'); }

function getActivator() : BindingActivator<number> {
    return {
        name: 'foo',
        activate: function(ctx : BindingContext<number>) { return Promise.resolve({deactivate: () => {}}); }
    }
}

function getBinding(parametersFunc : (ctx : ModelContext) => number) : BindingDeclaration<number> {
    return new BindingDeclaration(getActivator(), parametersFunc);
}