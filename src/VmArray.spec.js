//@flow
import vmArray from './VmArray';

describe('The VmArray type', () => {
    it('should store the correct initial value', () => {
        const val = vmArray([1, 2, 3]);
        expect(val.getShallowCopy()).toEqual([1, 2, 3]);
    });

    it('should be unaffected by changes to the original value', () => {
        const arr = [1, 2, 3];
        const val = vmArray(arr);
        arr.push(4);
        expect(val.getShallowCopy()).toEqual([1, 2, 3]);
    });

    it('should expose a replacement value', () => {
        const val = vmArray([1, 2, 3]);
        val.replaceUsingCopyOf([5, 6]);
        expect(val.getShallowCopy()).toEqual([5, 6]);
    });

    it('should be unaffected by changes to the replacement value', () => {
        const val = vmArray([1, 2, 3]);
        const replacement = [5, 6]
        val.replaceUsingCopyOf(replacement);
        replacement.push(7);
        expect(val.getShallowCopy()).toEqual([5, 6]);
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
        val.replaceUsingCopyOf(replacement);
        expect(observedValue).toEqual(['Four', 'Five']);
        subscription.unsubscribe();
    });
});