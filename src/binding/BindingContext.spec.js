//@flow

import BindingContext from './BindingContext';
import BindingDeclaration from './BindingDeclaration';
import { BindingActivator } from './BindingActivator';
import getModelContext, { ModelContext } from './ModelContext';
import { ProvidesBindingDom } from '../rendering/BindingDom';
import { BindingOptionsFactory } from '../options/BindingOptionsFactory';

describe('The BindingContext class', () => {
    const optionsFactory = new BindingOptionsFactory();
    const options = optionsFactory.getOptions();

    describe('the getAllBindings function', () => {
        it('should not return the original array', () => {
            const actions = [ getASampleBinding() ];
            const sut = new BindingContext(getSampleDom(), getSampleModelContext(), 'Params', actions, options);

            const result = sut.getAllBindings();

            expect(result).not.toBe(actions);
        });

        it('should not affect the original array if its return is manipulated', () => {
            const actions = [ getASampleBinding() ];
            const sut = new BindingContext(getSampleDom(), getSampleModelContext(), 'Params', actions, options);

            const mutatedResult = sut.getAllBindings();
            mutatedResult.push(getASampleBinding('bar'));

            const result = sut.getAllBindings();

            expect(result.length).toBe(1);
        });
    });

    function getSampleModelContext() : ModelContext {
        return getModelContext(1);
    }

    function getSampleDom() : ProvidesBindingDom {
        const placeholder = {
            get open() { return document.createComment('Open'); },
            get close() { return document.createComment('Close'); },
            get standin() { return document.createComment('Standin'); },
        };
        return {
            get element() : HTMLElement { return document.createElement('div'); },
            get placeholder() { return placeholder; },
            omitTag: false,
            remove: false,
        };
    }

    function getASampleBinding(name : string = 'foo') : BindingDeclaration<mixed> {
        return new BindingDeclaration({ name: name, activate: ctx => {} }, (ctx) => 123);
    }
});