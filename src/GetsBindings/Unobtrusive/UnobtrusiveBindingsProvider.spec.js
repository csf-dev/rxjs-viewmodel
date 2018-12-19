//@flow
import { GetsBindingActivator } from '../../GetsBindingActivator';
import { BindingActivator } from '../../binding/BindingActivator';
import type { UnobtrusiveBindingDefinition } from './UnobtrusiveBindingDefinition';
import type { BindingDefinition } from '../BindingDefinition';
import { GetsElementBindings } from '../GetsElementBindings';
import { BindingOptions } from '../../core';
import { UnobtrusiveBindingsProvider } from './UnobtrusiveBindingsProvider';

describe('The unobtrusive bindings provider', () => {
    let
        aDivElement : HTMLElement,
        aSpanElement : HTMLElement,
        aDivElementWithClassFoo : HTMLElement,
        aPElementWithClassFoo : HTMLElement;
    let sut : GetsElementBindings;
    let activatorProvider : GetsBindingActivator;

    beforeEach(() => {
        aDivElement = document.createElement('div');
        aSpanElement = document.createElement('span');
        aDivElementWithClassFoo = document.createElement('div');
        aDivElementWithClassFoo.classList.add('foo');
        aPElementWithClassFoo = document.createElement('p');
        aPElementWithClassFoo.classList.add('foo');

        const allBindings = getUnobtrusiveBindings();
        activatorProvider = new DummyActivatorProvider();
        const options = new BindingOptions({bindingActivatorProvider: activatorProvider, bindingDefinitions: allBindings});
        sut = new UnobtrusiveBindingsProvider(options);

        spyOn(activatorProvider, 'getActivator').and.callFake(name => Promise.resolve({ name: name, activate: ctx => {} }));
    });

    it('should be able to get a single binding for a matching element', async () => {
        const result = await sut.getBindings(aDivElement);

        expect(result.bindings.length).toBe(1);
        const activatorNames = result.bindings.map(x => x.activator.name);
        expect(activatorNames).toContain('activator1');
    });

    it('should be able to get two bindings for a matching element', async () => {
        const result = await sut.getBindings(aPElementWithClassFoo);

        expect(result.bindings.length).toBe(2);
        const activatorNames = result.bindings.map(x => x.activator.name);
        expect(activatorNames).toContain('activator2');
        expect(activatorNames).toContain('activator3');
    });

    it('should not get bindings for an element which does not match', async () => {
        const result = await sut.getBindings(aSpanElement);

        expect(result.bindings.length).toBe(0);
    });

    it('should be able to get three bindings for an element which matches two definitions', async () => {
        const result = await sut.getBindings(aDivElementWithClassFoo);

        expect(result.bindings.length).toBe(3);
        const activatorNames = result.bindings.map(x => x.activator.name);
        expect(activatorNames).toContain('activator1');
        expect(activatorNames).toContain('activator2');
        expect(activatorNames).toContain('activator3');
    });
});

class DummyActivatorProvider implements GetsBindingActivator {
    getActivator(name : string) : Promise<BindingActivator<mixed>> { throw new Error('Not implemented'); }
}
 
function getUnobtrusiveBindings() : Array<UnobtrusiveBindingDefinition> {
    return [
        {
            selector: 'div',
            bindings: {
                activator: 'activator1',
                paramsProvider: ctx => ctx.get<number>('one')
            }
        },
        {
            selector: '.foo',
            bindings: [
                {
                    activator: 'activator2',
                    paramsProvider: ctx => ctx.get<number>('one')
                },
                {
                    activator: 'activator3',
                    paramsProvider: ctx => ctx.get<number>('one')
                },
            ]
        }
    ];
}

