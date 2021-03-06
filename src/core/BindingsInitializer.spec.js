//@flow
import { GetsBindings } from '../GetsBindings';
import { GetsActivatableBindings } from '../GetsActivatableBindings';
import { GetsBindingContext } from '../GetsActivatableBindings/GetsBindingContext';
import { ActivatesManyBindings } from '../ActivatesManyBindings';
import type { ActivatableBinding, ElementsWithBindingDeclarations } from '../binding';
import { LiveBinding, BindingDeclaration, BindingContext } from '../binding';
import { BindingActivator } from '../binding/BindingActivator';
import { getDom } from '../rendering';
import BindingsInitializer from './BindingsInitializer';
import { BindingOptionsFactory } from '../options/BindingOptionsFactory';
import type { MaybeBindingOptions } from '../options';

describe('The bindings initializer', () => {
    let
        element : HTMLElement,
        bindingsProvider : GetsBindings,
        activatableBindingsProvider : GetsActivatableBindings,
        bulkActivator : ActivatesManyBindings;
    const optionsFactory = new BindingOptionsFactory();

    beforeEach(function() {
        element = document.createElement('div');
        bindingsProvider = getMockBindingsProvider();
        activatableBindingsProvider = getMockActivatableBindingProvider();
        bulkActivator = getMockBulkBindingActivator();
    });

    function getSut() {
        const options : MaybeBindingOptions = {
            bindingsProvider: bindingsProvider,
            activatableBindingsProvider: activatableBindingsProvider,
            bulkBindingActivator: bulkActivator
        };
        return new BindingsInitializer(element, options, optionsFactory);
    }

    it('should pass the root element to the bindings provider as a parameter', function() {
        spyOn(bindingsProvider, 'getBindings').and.returnValue(Promise.resolve(new Map()));
        const sut = getSut();

        sut.initialize({});

        expect(bindingsProvider.getBindings).toHaveBeenCalledWith(element);
    });

    it('should get activatable bindings from the source bindings using the configured provider', async function() {
        const binding = getMockBinding('foo');
        const sourceBindings = [ { element, bindings: [binding] } ];
        bindingsProvider = getMockBindingsProvider(sourceBindings);
        spyOn(activatableBindingsProvider, 'getActivatableBindings').and.returnValue([]);
        const sut = getSut();
        const vm = {};

        await sut.initialize(vm);

        expect(activatableBindingsProvider.getActivatableBindings).toHaveBeenCalledWith(sourceBindings, vm, jasmine.anything());
    });

    it('should activate all of the contextualized bindings', async function() {
        const binding1 = getMockBinding('foo');
        const binding2 = getMockBinding('bar');
        const contextualBindings = [
            { binding: binding1, context: null, },
            { binding: binding2, context: null, },
        ];
        spyOn(activatableBindingsProvider, 'getActivatableBindings').and.returnValue(contextualBindings);
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

function getMockBindingsProvider(result? : ElementsWithBindingDeclarations) : GetsBindings {
    const res : ElementsWithBindingDeclarations = result || [];
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

function getMockActivatableBindingProvider(result? : Array<ActivatableBinding<mixed>>) : GetsActivatableBindings {
    const res = result || [];
    return { getActivatableBindings(bindings : ElementsWithBindingDeclarations, vm : mixed) { return Promise.resolve(res); } };
}

function getMockBulkBindingActivator(result? : Array<Promise<LiveBinding<mixed>>>) : ActivatesManyBindings {
    const res = result || [];
    return { activateAll(contextualBindings : Array<ActivatableBinding<mixed>>) { return res; } };
}

function getMockActivator(name : string) : BindingActivator<mixed> {
    return {
        name: name,
        activate: ctx => new Promise((res, rej) => {
            setTimeout(() => { res({deactivate: () => {}}); }, 25);
        })
    };
}

function getMockBinding(activatorName : string) {
    const activator = getMockActivator(activatorName);
    return new BindingDeclaration(activator, ctx => {});
}