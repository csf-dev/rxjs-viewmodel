//@flow
import { GetsActivatableBindings, GetsBindingContext, } from '.';
import { ActivatableBindingsProvider } from './ActivatableBindingsProvider';
import { BindingActivator, BindingDeclaration, BindingContext } from '../binding';
import type { ActivatableBinding } from '../binding';

describe('The contextual bindings provider', () => {
    it('should return an array of contextual bindings pointing to the correct bindings, across multiple elements', () => {
        const bindingContextFactory = getMockBindingContextFactory();
        spyOn(bindingContextFactory, 'getContext').and.returnValue(null);

        const element1 = getElement();
        const element2 = getElement();
        const element1Binding1 = getBinding();
        const element2Binding1 = getBinding();
        const element2Binding2 = getBinding();

        const elementsAndBindings = new Map([
            [ element1, [ element1Binding1 ] ],
            [ element2, [ element2Binding1, element2Binding2 ] ]
        ]);

        const sut = new ActivatableBindingsProvider(bindingContextFactory);

        const result = sut.getContextualBindings(elementsAndBindings);

        expect(result.map(item => item.binding)).toEqual([element1Binding1, element2Binding1, element2Binding2]);
    });

    it('should return an array of contextual bindings pointing to the correct context, across multiple elements', () => {
        const element1 = getElement();
        const element2 = getElement();
        const element1Binding1 = getBinding();
        const element2Binding1 = getBinding();
        const element2Binding2 = getBinding();

        const elementsAndBindings = new Map([
            [ element1, [ element1Binding1 ] ],
            [ element2, [ element2Binding1, element2Binding2 ] ]
        ]);

        const
            context1 = { name: 'Context 1' },
            context2 = { name: 'Context 2' },
            context3 = { name: 'Context 3' };

        const bindingContextFactory = getMockBindingContextFactory();
        spyOn(bindingContextFactory, 'getContext').and.callFake((ele, bin, allBin) => {
            switch(bin) {
            case element1Binding1:
                return context1;
            case element2Binding1:
                return context2;
            case element2Binding2:
                return context3;
            default:
                throw new Error('Unexpected binding');
            }
        });

        const sut = new ActivatableBindingsProvider(bindingContextFactory);

        const result = sut.getContextualBindings(elementsAndBindings);

        expect(result.map(item => item.context)).toEqual([context1, context2, context3]);
    });
});

const getElement : () => HTMLElement = () => document.createElement('div');

const getBinding = () => new BindingDeclaration({ name: 'foo', activate: ctx => null }, ctx => 1);

const getMockBindingContextFactory : () => GetsBindingContext = () => {
    return {
        getContext(element, binding, allBindings) : BindingContext<mixed> { throw new Error('Not implemented'); }
    };
}