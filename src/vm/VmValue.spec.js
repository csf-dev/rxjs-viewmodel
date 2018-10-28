//@flow
import vmValue from './VmValue';

describe('The VmValue type', () => {
    it('should store the correct initial value', () => {
        const val = vmValue('Initial value');
        expect(val.value).toBe('Initial value');
    });

    it('should have the correct value after it is mutated', () => {
        const val = vmValue(55);
        val.value = 66;
        expect(val.value).toBe(66);
    });

    it('should expose the correct initial value through its subject', () => {
        const val = vmValue(13);
        let observedValue : number;
        const subscription = val.subject.subscribe((next) => { observedValue = next; });
        expect(observedValue).toBe(13);
        subscription.unsubscribe();
    });

    it('should expose a correct modified value through its subject', () => {
        const val = vmValue('The first value');
        let observedValue : string;
        const subscription = val.subject.subscribe((next) => { observedValue = next; });
        val.value = 'And now the second value';
        expect(observedValue).toBe('And now the second value');
        subscription.unsubscribe();
    });
});