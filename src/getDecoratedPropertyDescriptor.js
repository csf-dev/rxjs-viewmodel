//@flow
import { ProvidesSubject } from './ProvidesSubject';
import type { FieldDescriptor, MethodOutputDescriptor, Key } from 'proposal-decorators-types';

function addPrivateVmProperty<T>(target : {}, vmValueFactory : () => ProvidesSubject<T>, key : Symbol) {
    const val = vmValueFactory();
    Object.defineProperty(target, key, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: val
    });
}

function getDecoratedPropertyGetter<TVal,TVmVal : ProvidesSubject<TVal>>(vmValueFactory : () => TVmVal, key : Key) : () => TVmVal {
    const privateKey = Symbol(key.toString());
    return function() {
        if(!this.hasOwnProperty(privateKey)) addPrivateVmProperty(this, vmValueFactory, privateKey);
        return this[privateKey];
    };
}

function getDecoratedPropertyDescriptor<TVal,TVmVal : ProvidesSubject<TVal>>(vmValueFactory : () => TVmVal,
                                                                             key : Key) : PropertyDescriptor<TVmVal> {
    return {
        configurable: true,
        enumerable: true,
        get: getDecoratedPropertyGetter(vmValueFactory, key)
    };
}

export default getDecoratedPropertyDescriptor;