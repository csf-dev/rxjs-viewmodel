//@flow
import { GetsActivatableBindings } from '.';
import { GetsBindingContext } from './GetsBindingContext';
import { ActivatableBindingsProvider } from './ActivatableBindingsProvider';
import { BindingActivator, BindingDeclaration, BindingContext } from '../binding';
import type { ActivatableBinding } from '../binding';

describe('The activatable bindings provider', () => {
    it('should return an array of activatable bindings pointing to the correct source bindings, across multiple elements', async () => {
        const bindingContextFactory = getMockBindingContextFactory();
        spyOn(bindingContextFactory, 'getContext').and.returnValue(Promise.resolve(null));

        const element1 = getElement();
        const element2 = getElement();
        const element1Binding1 = getBinding();
        const element2Binding1 = getBinding();
        const element2Binding2 = getBinding();

        const elementsAndBindings = [
            { element: element1, bindings: [ element1Binding1 ] },
            { element: element2, bindings: [ element2Binding1, element2Binding2 ] }
        ];

        const sut = new ActivatableBindingsProvider(bindingContextFactory);

        const result = await sut.getActivatableBindings(elementsAndBindings);

        expect(result.map(item => item.binding)).toEqual([element1Binding1, element2Binding1, element2Binding2]);
    });

    it('should return an array of activatable bindings pointing to the correct context, across multiple elements', async () => {
        const element1 = getElement();
        const element2 = getElement();
        const element1Binding1 = getBinding();
        const element2Binding1 = getBinding();
        const element2Binding2 = getBinding();

        const elementsAndBindings = [
            { element: element1, bindings: [ element1Binding1 ] },
            { element: element2, bindings: [ element2Binding1, element2Binding2 ] }
        ];

        const
            context1 = { name: 'Context 1' },
            context2 = { name: 'Context 2' },
            context3 = { name: 'Context 3' };

        const bindingContextFactory = getMockBindingContextFactory();
        spyOn(bindingContextFactory, 'getContext').and.callFake((ele, bin, allBin) => {
            switch(bin) {
            case element1Binding1:
                return Promise.resolve(context1);
            case element2Binding1:
                return Promise.resolve(context2);
            case element2Binding2:
                return Promise.resolve(context3);
            default:
                throw new Error('Unexpected binding');
            }
        });

        const sut = new ActivatableBindingsProvider(bindingContextFactory);

        const result = await sut.getActivatableBindings(elementsAndBindings);

        expect(result.map(item => item.context)).toEqual([context1, context2, context3]);
    });
});

const getElement : () => HTMLElement = () => document.createElement('div');

const getBinding = () => new BindingDeclaration({ name: 'foo', activate: ctx => null }, ctx => 1);

const getMockBindingContextFactory : () => GetsBindingContext = () => {
    return {
        getContext<T>(element, binding, allBindings) : Promise<BindingContext<T>> { throw new Error('Not implemented'); }
    };
}