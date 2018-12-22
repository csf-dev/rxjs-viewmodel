//@flow
import vmValue from './VmValue';
import type { VmValue } from './VmValue';
import type { FieldDescriptor, MethodOutputDescriptor, Key } from 'proposal-decorators-types';
import getDecoratedPropertyDescriptor from './getDecoratedPropertyDescriptor';
import getPropertyDescriptor from './getPropertyDescriptor';

function makeVmProperty<T>(targetObject : {},
                           key : string | Symbol,
                           initialValue : T) : VmValue<T> {
    const val = vmValue(initialValue);
    const descriptor = getPropertyDescriptor(val);
    Object.defineProperty(targetObject, key, descriptor);
    return val;
}

function vmProperty<T>(initial : T) {
    return function(methodDescriptor : FieldDescriptor<T>) : MethodOutputDescriptor<VmValue<T>,mixed> {
        const { key, placement } = methodDescriptor;
        const descriptor = getDecoratedPropertyDescriptor(() => vmValue(initial), key);
        return { kind: 'method', key, placement, descriptor };
    }
}

export default makeVmProperty;
export { vmProperty }