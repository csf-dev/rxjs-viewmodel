//@flow
import makeVmProperty, { vmProperty } from './VmProperty';
import { VmValue } from './VmValue';

describe('The VM property creator function', () => {
    it('should create a VM property upon an arbitrary object', () => {
        const myObj = {};
        makeVmProperty(myObj, 'myProperty', 42);
        expect(myObj.myProperty.value).toBe(42);
    });

    it('should make a created VM property readonly', () => {
        const myObj = {};
        makeVmProperty(myObj, 'myProperty', 42);
        expect(() => myObj.myProperty = 'foo').toThrow();
    });
});

describe('The VM property decorator', () => {
    class MyClass {
        @vmProperty('Initial value') myProperty : VmValue<string>;
    }

    it('should set up a VM property with the correct initial value upon class instances', () => {
        const myObj = new MyClass();
        expect(myObj.myProperty.value).toBe('Initial value');
    });

    it('should set up a VM property which permits mutating upon class instances', () => {
        const myObj = new MyClass();
        myObj.myProperty.value = 'Different value';
        expect(myObj.myProperty.value).toBe('Different value');
    });

    it('should not expose excess enumerable named properties', () => {
        const myObj = new MyClass();
        const descriptors = Object.getOwnPropertyNames(myObj);
        expect(descriptors.length).toBe(1);
    });

    it('should not expose excess enumerable symbol properties', () => {
        const myObj = new MyClass();
        const descriptors = Object.getOwnPropertySymbols(myObj);
        expect(descriptors.length).toBe(0);
    });

    it('should not expose excess enumerable items', () => {
        const myObj = new MyClass();
        let itemCount : number = 0;
        for(let name in myObj) {
            itemCount++;
        }
        expect(itemCount).toBe(1);
    });
});