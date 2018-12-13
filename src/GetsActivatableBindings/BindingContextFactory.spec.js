//@flow
import { BindingContextFactory } from './BindingContextFactory';
import { BindingDeclaration, BindingContext, BindingActivator } from '../binding';
import { ModelContext } from '../binding/ModelContext';

describe('The binding context factory.', () => {
    it('should return a promise which resolves to a BindingContext', async () => {
        const vm = { myNumber: 4 };
        const sut = new BindingContextFactory(vm);

        const result = await sut.getContext(getElement(),
                                            getBinding(ctx => ctx.getViewModel<{myNumber:number}>().myNumber),
                                            []);

        expect(result instanceof BindingContext).toBe(true);
    });

    it('should expose the correct parameters value in the returned binding context', async () => {
        const vm = { myNumber: 4 };
        const sut = new BindingContextFactory(vm);

        const result = await sut.getContext(getElement(),
                                            getBinding(ctx => ctx.getViewModel<{myNumber:number}>().myNumber + 1),
                                            []);

        expect(result.parameters).toEqual(5);
    });

    it('should use a parent binding context if it is provided', async () => {
        const vm = { myNumber: 4 };
        const sut = new BindingContextFactory(vm);

        const parent = await sut.getContext<number>(getElement(),
                                                    getBinding(ctx => ctx.getViewModel<{myNumber:number}>().myNumber + 1),
                                                    []);
        parent.model.set('num', 22);
        const result = await sut.getContext(getElement(),
                                            getBinding(ctx => ctx.get('num') || 0),
                                            [],
                                            Promise.resolve(parent));

        expect(result.parameters).toEqual(22);
    });

    it('should pass all bindings to the resultant context', async () => {
        const vm = { myNumber: 4 };
        const sut = new BindingContextFactory(vm);

        const otherBinding = getBinding(x => 1);
        const allBindings = [ otherBinding ];
        const result = await sut.getContext(getElement(),
                                            getBinding(ctx => ctx.get('num') || 0),
                                            allBindings);

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

function getBinding(provider : (ctx : ModelContext) => number) : BindingDeclaration<number> {
    return new BindingDeclaration(getActivator(), provider);
}