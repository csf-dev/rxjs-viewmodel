//@flow
import vmValue from './VmValue';
import type { VmValue } from './VmValue';
import type { FieldDescriptor, MethodOutputDescriptor, Key } from 'proposal-decorators-types';

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
    const val = vmValue(initialValue);
    const descriptor = getPropertyDescriptor(val);
    Object.defineProperty(targetObject, key, descriptor);
    return val;
}

function addPrivateVmProperty<T>(target : {}, initial : T, key : Symbol) {
    const val = vmValue(initial);
    Object.defineProperty(target, key, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: val
    });
}

function getDecoratedPropertyGetter<T>(initial : T, key : Key) : () => VmValue<T> {
    const privateKey = Symbol(key.toString());
    return function() {
        if(!this.hasOwnProperty(privateKey)) addPrivateVmProperty(this, initial, privateKey);
        return this[privateKey];
    };
}

function getDecoratedPropertyDescriptor<T>(initial : T, key : Key) : PropertyDescriptor<VmValue<T>> {
    return {
        configurable: true,
        enumerable: true,
        get: getDecoratedPropertyGetter(initial, key)
    };
}

function vmProperty<T>(initial : T) {
    return function(methodDescriptor : FieldDescriptor<T>) : MethodOutputDescriptor<VmValue<T>,mixed> {
        const { key, placement } = methodDescriptor;
        const descriptor = getDecoratedPropertyDescriptor(initial, key);

        return { kind: 'method', key, placement, descriptor };
    }
}

export default makeVmProperty;
export { vmProperty }