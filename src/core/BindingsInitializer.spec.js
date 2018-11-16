//@flow
import { GetsBindings } from '../GetsBindings';
import { GetsBindingContext, GetsActivatableBindings } from '../GetsBindingContext';
import { ActivatesManyBindings } from '../ActivatesManyBindings';
import type { ActivatableBinding } from '../binding';
import { LiveBinding, BindingDeclaration, BindingContext, ModelContext, BindingActivator } from '../binding';
import { getDom } from '../rendering';
import BindingsInitializer from './BindingsInitializer';

describe('The bindings initializer', () => {
    let
        element : HTMLElement,
        bindingsProvider : GetsBindings,
        contextualBindingProvider : GetsActivatableBindings,
        bulkActivator : ActivatesManyBindings;


    beforeEach(function() {
        element = document.createElement('div');
        bindingsProvider = getMockBindingsProvider();
        contextualBindingProvider = getMockContextualBindingProvider();
        bulkActivator = getMockBulkBindingActivator();
    });

    function getSut() {
        return new BindingsInitializer(element, {
            bindingsProvider: bindingsProvider,
            contextualBindingsProvider: contextualBindingProvider,
            bulkBindingActivator: bulkActivator
        });
    }

    it('should pass the root element to the bindings provider as a parameter', function() {
        spyOn(bindingsProvider, 'getBindings').and.returnValue(Promise.resolve(new Map()));
        const sut = getSut();

        sut.initialize({});

        expect(bindingsProvider.getBindings).toHaveBeenCalledWith(element);
    });

    it('should contextualize the created bindings using the configured provider', async function() {
        const binding = getMockBinding('foo');
        const bindings = new Map([ [element, [binding] ] ]);
        bindingsProvider = getMockBindingsProvider(bindings);
        spyOn(contextualBindingProvider, 'getContextualBindings').and.returnValue([]);
        const sut = getSut();

        await sut.initialize({});

        expect(contextualBindingProvider.getContextualBindings).toHaveBeenCalledWith(bindings);
    });

    it('should activate all of the contextualized bindings', async function() {
        const binding1 = getMockBinding('foo');
        const binding2 = getMockBinding('bar');
        const contextualBindings = [
            { binding: binding1, context: null, },
            { binding: binding2, context: null, },
        ];
        spyOn(contextualBindingProvider, 'getContextualBindings').and.returnValue(contextualBindings);
        spyOn(bulkActivator, 'activateAll').and.returnValue([Promise.resolve()]);
        const sut = getSut();

        await sut.initialize({});

        expect(bulkActivator.activateAll).toHaveBeenCalledWith(contextualBindings);
    });

    it('should return an object containing all of the activated bindings', async function() {
        spyOn(bulkActivator, 'activateAll').and.returnValue([Promise.resolve(), Promise.resolve()]);
        const sut = getSut();

        const result = await sut.initialize({});

        expect(result.bindings.length).toBe(2);
    });
});

function getMockBindingsProvider(result? : Map<HTMLElement,Array<BindingDeclaration<mixed>>>) : GetsBindings {
    const res = result || new Map();
    return {
        getBindings(element : HTMLElement) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(res);
                }, 50);
            });
        }
    };
}

function getMockContextualBindingProvider(result? : Array<ActivatableBinding<mixed>>) : GetsActivatableBindings {
    const res = result || [];
    return { getContextualBindings(bindings : Map<HTMLElement,Array<BindingDeclaration<mixed>>>) { return Promise.resolve(res); } };
}

function getMockBulkBindingActivator(result? : Array<Promise<LiveBinding<mixed>>>) : ActivatesManyBindings {
    const res = result || [];
    return { activateAll(contextualBindings : Array<ActivatableBinding<mixed>>) { return res; } };
}

function getMockActivator(name : string) : BindingActivator<mixed> {
    return {
        name: name,
        activate: ctx => new Promise((res, rej) => {
            setTimeout(() => { res(undefined); }, 25);
        })
    };
}

function getMockBinding(activatorName : string) {
    const activator = getMockActivator(activatorName);
    return new BindingDeclaration(activator, ctx => {});
}