//@flow
import vmArray from './VmArray';
import type { VmArray } from './VmArray';
import type { FieldDescriptor, MethodOutputDescriptor, Key } from 'proposal-decorators-types';
import getDecoratedPropertyDescriptor from './getDecoratedPropertyDescriptor';
import getPropertyDescriptor from './getPropertyDescriptor';

function makeVmArrayProperty<T>(targetObject : {},
                                key : string | Symbol,
                                initialValue? : Array<T>) : VmArray<T> {
    const val = vmArray(initialValue || []);
    const descriptor = getPropertyDescriptor(val);
    Object.defineProperty(targetObject, key, descriptor);
    return val;
}

function vmArrayProperty<T>(initial? : Array<T>) {
    return function(methodDescriptor : FieldDescriptor<T>) : MethodOutputDescriptor<VmArray<T>,mixed> {
        const { key, placement } = methodDescriptor;
        const descriptor = getDecoratedPropertyDescriptor(() => vmArray(initial || []), key);
        return { kind: 'method', key, placement, descriptor };
    }
}

export default makeVmArrayProperty;
export { vmArrayProperty }