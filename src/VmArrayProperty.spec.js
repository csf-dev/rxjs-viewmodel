//@flow
import makeVmArrayProperty, { vmArrayProperty } from './VmArrayProperty';
import type { VmArray } from './VmArray';

describe('The VM array property creator function', () => {
    it('should create a VM property upon an arbitrary object', () => {
        const myObj = {};
        makeVmArrayProperty(myObj, 'myProperty', [42]);
        expect(myObj.myProperty.getShallowCopy()).toEqual([42]);
    });

    it('should make a created VM property readonly', () => {
        const myObj = {};
        makeVmArrayProperty(myObj, 'myProperty');
        expect(() => myObj.myProperty = 'foo').toThrow();
    });
});

describe('The VM array property decorator', () => {
    class MyClass {
        @vmArrayProperty(['Item one', 'Item two']) myProperty : VmArray<string>;
    }

    it('should set up a VM property with the correct initial value upon class instances', () => {
        const myObj = new MyClass();
        expect(myObj.myProperty.getShallowCopy()).toEqual(['Item one', 'Item two']);
    });

    it('should set up a VM property which permits mutating upon class instances', () => {
        const myObj = new MyClass();
        myObj.myProperty.replaceUsingCopyOf(['Different', 'items']);
        expect(myObj.myProperty.getShallowCopy()).toEqual(['Different', 'items']);
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
