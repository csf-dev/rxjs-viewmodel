//@flow
import type { BindingOptions, MaybeBindingOptions } from './BindingOptions';
import { GetsBindingOptions } from './GetsBindingOptions';
import { getBindingsProvider } from '../GetsBindings';
import { getActivatableBindingsProvider } from '../GetsActivatableBindings';
import { getBulkBindingActivator } from '../ActivatesManyBindings';
import getElementProvider from '../GetsBindings/ElementProvider';
import { UnobtrusiveBindingsProvider } from '../GetsBindings/Unobtrusive';
import getActivatorProvider, { GetsBindingActivator } from '../GetsBindingActivator';
import type { UnobtrusiveBindingDefinition } from '../GetsBindings/Unobtrusive/UnobtrusiveBindingDefinition';
import { getTaskScheduler } from 'dom-task-scheduler';

function getDefaultOptions(opts : MaybeBindingOptions) : BindingOptions {
    const elementProvider = opts.elementProvider || getElementProvider();
    const activator : GetsBindingActivator = opts.bindingActivatorProvider || getActivatorProvider();
    const bindingDefinitions : Array<UnobtrusiveBindingDefinition> = opts.bindingDefinitions || [];
    const elementBindingsProvider = opts.elementBindingProvider || new UnobtrusiveBindingsProvider(bindingDefinitions, activator);
    const bindingsProvider = opts.bindingsProvider || getBindingsProvider(elementBindingsProvider, elementProvider);

    return {
        bindingsProvider: bindingsProvider,
        activatableBindingsProvider: opts.activatableBindingsProvider || getActivatableBindingsProvider(),
        bulkBindingActivator: opts.bulkBindingActivator || getBulkBindingActivator(),
        elementProvider: elementProvider,
        elementBindingProvider: elementBindingsProvider,
        bindingActivatorProvider: activator,
        bindingDefinitions: bindingDefinitions,
        domScheduler: opts.domScheduler || getTaskScheduler()
    };
}

export class BindingOptionsFactory implements GetsBindingOptions {
    getOptions(options? : MaybeBindingOptions) : BindingOptions {
        const opts : MaybeBindingOptions = options || {};
        const defaults = getDefaultOptions(opts);
        return { ...opts, ...defaults };
    }
}