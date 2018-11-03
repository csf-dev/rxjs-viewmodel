//@flow

import BindingContext from './BindingContext';
import { Binding } from './Binding';
import { BindingActivator } from './BindingActivator';
import ModelContext from './ModelContext';
import { ProvidesBindingMarkup } from '../rendering/BindingMarkup';

describe('The BindingContext class', () => {
    describe('the getAllActions function', () => {
        it('should not return the original array', () => {
            const actions = [ getASampleBinding() ];
            const sut = new BindingContext(getSampleMarkup(), getSampleModelContext(), 'Params', actions);

            const result = sut.getAllActions();

            expect(result).not.toBe(actions);
        });

        it('should not affect the original array if its return is manipulated', () => {
            const actions = [ getASampleBinding() ];
            const sut = new BindingContext(getSampleMarkup(), getSampleModelContext(), 'Params', actions);
            const result1 = sut.getAllActions();
            result1.push(getASampleBinding('bar'));

            const result = sut.getAllActions();

            expect(result.length).toBe(1);
        });
    });

    function getSampleModelContext() : ModelContext {
        return new ModelContext(1);
    }

    function getSampleMarkup() : ProvidesBindingMarkup {
        const placeholder = {
            get open() { return document.createComment('Open'); },
            get close() { return document.createComment('Close'); },
            get standin() { return document.createComment('Standin'); },
        };
        return {
            get isRoot() { return true; },
            get element() : HTMLElement { return document.createElement('div'); },
            get placeholder() { return placeholder; },
            omitTag: false,
            remove: false,
        };
    }

    function getASampleBinding(name : string = 'foo') : Binding<mixed> {
        return new Binding({ name: name, activate: ctx => {} }, 123);
    }
});