//@flow
import createVmValue, { VmValue } from './VmValue';
import type { MethodDescriptor, MethodOutputDescriptor } from 'proposal-decorators-types';

function getPropertyDescriptor<T>(vmValue : VmValue<T>) : PropertyDescriptor<VmValue<T>> {
    return {
        configurable: true,
        enumerable: true,
        get: () => vmValue
    };
}

function makeVmProperty<T>(targetObject : {},
                                          key : string | Symbol,
                                          initialValue : T) : VmValue<T> {
    const vmValue = createVmValue(initialValue);
    const descriptor = getPropertyDescriptor<T>(vmValue);
    Object.defineProperty(targetObject, key, descriptor);
    return vmValue;
}

function vmProperty<T>(initial : T) {
    return function(methodDescriptor : MethodDescriptor<T>) : MethodOutputDescriptor<VmValue<T>,mixed> {
        const { kind, key, placement } = methodDescriptor;
        const vmValue = createVmValue(initial);
        const descriptor = getPropertyDescriptor<T>(vmValue);

        return { kind, key, placement, descriptor };
    }
}

export default makeVmProperty;
export { vmProperty }