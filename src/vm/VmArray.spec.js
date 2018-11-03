//@flow
import vmArray from './VmArray';

describe('The VmArray type', () => {
    it('should store the correct initial value', () => {
        const val = vmArray([1, 2, 3]);
        expect(val.getCopy()).toEqual([1, 2, 3]);
    });

    it('should be unaffected by changes to the original value', () => {
        const arr = [1, 2, 3];
        const val = vmArray(arr);
        arr.push(4);
        expect(val.getCopy()).toEqual([1, 2, 3]);
    });

    it('should expose a replacement value', () => {
        const val = vmArray([1, 2, 3]);
        val.updateWith([5, 6]);
        expect(val.getCopy()).toEqual([5, 6]);
    });

    it('should be unaffected by changes to the replacement value', () => {
        const val = vmArray([1, 2, 3]);
        const replacement = [5, 6]
        val.updateWith(replacement);
        replacement.push(7);
        expect(val.getCopy()).toEqual([5, 6]);
    });

    it('should expose the correct initial value through its subject', () => {
        const val = vmArray([1, 2, 3]);
        let observedValue : Array<number>;
        const subscription = val.subject.subscribe((next) => { observedValue = next; });
        expect(observedValue).toEqual([1, 2, 3]);
        subscription.unsubscribe();
    });

    it('should expose a correct modified value through its subject', () => {
        const val = vmArray(['One', 'Two', 'Three']);
        const replacement = ['Four', 'Five'];
        let observedValue : Array<string>;
        const subscription = val.subject.subscribe((next) => { observedValue = next; });
        val.updateWith(replacement);
        expect(observedValue).toEqual(['Four', 'Five']);
        subscription.unsubscribe();
    });

    describe('should be mutable via copyWithin function and', () => {
        it('should return the same result as the array method of the same name', () => {
            const val = vmArray([1, 2, 3]);
            const result = val.copyWithin(2, 0);
            expect(result).toEqual([1,2,1]);
        });

        it('should notify subscribers of the new value', () => {
            const val = vmArray([1, 2, 3]);
            let observedValue : Array<number>;
            const subscription = val.subject.subscribe((next) => { observedValue = next; });
            val.copyWithin(2, 0);
            expect(observedValue).toEqual([1,2,1]);
            subscription.unsubscribe();
        });
    });

    describe('should be mutable via fill function and', () => {
        it('should return the same result as the array method of the same name', () => {
            const val = vmArray([1, 2, 3]);
            const result = val.fill(4);
            expect(result).toEqual([4, 4, 4]);
        });

        it('should notify subscribers of the new value', () => {
            const val = vmArray([1, 2, 3]);
            let observedValue : Array<number>;
            const subscription = val.subject.subscribe((next) => { observedValue = next; });
            val.fill(5);
            expect(observedValue).toEqual([5, 5, 5]);
            subscription.unsubscribe();
        });
    });

    describe('should be mutable via pop function and', () => {
        it('should return the same result as the array method of the same name', () => {
            const val = vmArray([1, 2, 3]);
            const result = val.pop();
            expect(result).toEqual(3);
        });

        it('should notify subscribers of the new value', () => {
            const val = vmArray([1, 2, 3]);
            let observedValue : Array<number>;
            const subscription = val.subject.subscribe((next) => { observedValue = next; });
            val.pop();
            expect(observedValue).toEqual([1,2]);
            subscription.unsubscribe();
        });
    });

    describe('should be mutable via push function and', () => {
        it('should return the same result as the array method of the same name', () => {
            const val = vmArray([1, 2, 3]);
            const result = val.push(4, 5);
            expect(result).toEqual(5);
        });

        it('should notify subscribers of the new value', () => {
            const val = vmArray([1, 2, 3]);
            let observedValue : Array<number>;
            const subscription = val.subject.subscribe((next) => { observedValue = next; });
            val.push(4, 5, 6);
            expect(observedValue).toEqual([1, 2, 3, 4, 5, 6]);
            subscription.unsubscribe();
        });
    });

    describe('should be mutable via reverse function and', () => {
        it('should return the same result as the array method of the same name', () => {
            const val = vmArray([1, 2, 3]);
            const result = val.reverse();
            expect(result).toEqual([3,2,1]);
        });

        it('should notify subscribers of the new value', () => {
            const val = vmArray([1, 2, 3]);
            let observedValue : Array<number>;
            const subscription = val.subject.subscribe((next) => { observedValue = next; });
            val.reverse();
            expect(observedValue).toEqual([3, 2, 1]);
            subscription.unsubscribe();
        });
    });

    describe('should be mutable via shift function and', () => {
        it('should return the same result as the array method of the same name', () => {
            const val = vmArray([1, 2, 3]);
            const result = val.shift();
            expect(result).toEqual(1);
        });

        it('should notify subscribers of the new value', () => {
            const val = vmArray([1, 2, 3]);
            let observedValue : Array<number>;
            const subscription = val.subject.subscribe((next) => { observedValue = next; });
            val.shift();
            expect(observedValue).toEqual([2,3]);
            subscription.unsubscribe();
        });
    });

    describe('should be mutable via sort function and', () => {
        it('should return the same result as the array method of the same name', () => {
            const val = vmArray([1, 2, 13]);
            const result = val.sort();
            expect(result).toEqual([1,13,2]);
        });

        it('should notify subscribers of the new value', () => {
            const val = vmArray([1, 2, 13]);
            let observedValue : Array<number>;
            const subscription = val.subject.subscribe((next) => { observedValue = next; });
            val.sort();
            expect(observedValue).toEqual([1,13,2]);
            subscription.unsubscribe();
        });
    });

    describe('should be mutable via splice function and', () => {
        it('should return the same result as the array method of the same name', () => {
            const val = vmArray([1, 2, 3]);
            const result = val.splice(1, 1, 1.5, 1.6);
            expect(result).toEqual([2]);
        });

        it('should notify subscribers of the new value', () => {
            const val = vmArray([1, 2, 3]);
            let observedValue : Array<number>;
            const subscription = val.subject.subscribe((next) => { observedValue = next; });
            val.splice(1, 1, 1.5, 1.6);
            expect(observedValue).toEqual([1, 1.5, 1.6, 3]);
            subscription.unsubscribe();
        });
    });

    describe('should be mutable via unshift function and', () => {
        it('should return the same result as the array method of the same name', () => {
            const val = vmArray([1, 2, 3]);
            const result = val.unshift(2, 0);
            expect(result).toEqual(5);
        });

        it('should notify subscribers of the new value', () => {
            const val = vmArray([1, 2, 3]);
            let observedValue : Array<number>;
            const subscription = val.subject.subscribe((next) => { observedValue = next; });
            val.unshift(2, 0);
            expect(observedValue).toEqual([2, 0, 1, 2, 3]);
            subscription.unsubscribe();
        });
    });
});