//@flow

import { GetsBindings } from '../GetsBindings';
import { GetsActivatableBindings } from '../GetsActivatableBindings';
import { ActivatesManyBindings } from '../ActivatesManyBindings';
import { GetsAllHTMLElements } from '../GetsBindings/ElementProvider';
import { GetsElementBindings } from '../GetsBindings/GetsElementBindings';
import { GetsBindingActivator } from '../GetsBindingActivator';
import type { UnobtrusiveBindingDefinition } from '../GetsBindings/Unobtrusive/UnobtrusiveBindingDefinition';
import { SchedulesDomTasks } from 'dom-task-scheduler';

export type BindingOptions = {
    bindingsProvider : GetsBindings;
    activatableBindingsProvider : GetsActivatableBindings;
    bulkBindingActivator : ActivatesManyBindings;
    elementProvider : GetsAllHTMLElements;
    elementBindingProvider : GetsElementBindings;
    bindingActivatorProvider : GetsBindingActivator;
    bindingDefinitions : Array<UnobtrusiveBindingDefinition>;
    domScheduler : SchedulesDomTasks;
}

export type MaybeBindingOptions = {
    bindingsProvider? : GetsBindings;
    activatableBindingsProvider? : GetsActivatableBindings;
    bulkBindingActivator? : ActivatesManyBindings;
    elementProvider? : GetsAllHTMLElements;
    elementBindingProvider? : GetsElementBindings;
    bindingActivatorProvider? : GetsBindingActivator;
    bindingDefinitions? : Array<UnobtrusiveBindingDefinition>;
    domScheduler? : SchedulesDomTasks;
}