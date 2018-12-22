//@flow
import { ActivatorRegistry } from '../GetsBindingActivator';
import { TextBindingActivator } from '../bindingActivators/TextBindingActivator';
import { ClassBindingActivator } from '../bindingActivators/ClassBindingActivator';
import type { UnobtrusiveBindingDefinition } from '../GetsBindings/Unobtrusive'
import { BehaviorSubject } from 'rxjs';
import applyBindings from '../core';

describe('A simple binding scenario with a single element', () => {
    it('should update the DOM as expected for a text binding', async () => {

        const options = {
            bindingDefinitions: getBindingDefinitions(),
            bindingActivatorProvider: getBindingActivatorRegistry()
        };

        const vm = new MyViewModel('that');

        const doc = document.documentElement;
        if(!doc) throw new Error('Document element must not be missing');
        const body = doc.querySelectorAll('body')[0];

        body.innerHTML = `<p>Hello, this is <span class="textBoundElement">my</span> document</p>`;
        applyBindings(body, vm, options);

        await briefWait();
        expect(body.innerHTML).toEqual(`<p>Hello, this is <span class="textBoundElement">that</span> document</p>`);

        vm.newVal('a very special');
        await briefWait();
        expect(body.innerHTML).toEqual(`<p>Hello, this is <span class="textBoundElement">a very special</span> document</p>`);
    });

    it('should update the DOM as expected for a class binding', async () => {

        const options = {
            bindingDefinitions: getBindingDefinitions(),
            bindingActivatorProvider: getBindingActivatorRegistry()
        };

        const vm = new MyViewModel('classOne');

        const doc = document.documentElement;
        if(!doc) throw new Error('Document element must not be missing');
        const body = doc.querySelectorAll('body')[0];

        body.innerHTML = `<p>Hello, this is <span class="classBoundElement">my</span> document</p>`;
        applyBindings(body, vm, options);

        await briefWait();
        expect(body.innerHTML).toEqual(`<p>Hello, this is <span class="classOne">my</span> document</p>`);

        vm.newVal('classTwo classThree');
        await briefWait();
        expect(body.innerHTML).toEqual(`<p>Hello, this is <span class="classTwo classThree">my</span> document</p>`);
    });
});

function getBindingActivatorRegistry() {
    const activatorRegistry = new ActivatorRegistry();
    activatorRegistry.add(new TextBindingActivator());
    activatorRegistry.add(new ClassBindingActivator());
    return activatorRegistry;
}

function getBindingDefinitions() : Array<UnobtrusiveBindingDefinition> {
    return [
        {
            selector: '.textBoundElement',
            bindings: {
                activator: 'text',
                paramsProvider: ctx => ctx.getVm<MyViewModel>().stringValue
            }
        },
        {
            selector: '.classBoundElement',
            bindings: {
                activator: 'class',
                paramsProvider: ctx => ctx.getVm<MyViewModel>().stringValue
            }
        }
    ];
}

function briefWait() : Promise<void> {
    var promise = new Promise((res, rej) => {
        setTimeout(() => res(), 50);
    });
    return promise;
}

class MyViewModel {
    #stringValue : BehaviorSubject<string>;

    get stringValue() : rxjs$Observable<string> { return this.#stringValue; }

    newVal(val : string) {
        this.#stringValue.next(val);
    }

    constructor(val : string) {
        this.#stringValue = new BehaviorSubject(val);
    }
}