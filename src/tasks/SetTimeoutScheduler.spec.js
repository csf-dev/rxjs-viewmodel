//@flow
import factory from './SetTimeoutScheduler';
import type { Scheduler } from './Scheduler';

describe('The set-timeout scheduler', () => {
    it('should be a function', () => {
        expect(typeof factory).toBe('function');
    });

    it('should return a function', () => {
        const sut = factory();
        expect(typeof sut).toBe('function');
    });

    it('should return a function which - when executed - returns a promise which eventually resolves with undefined', async () => {
        const sut : Scheduler = factory();
        expect(await sut()).toBeUndefined();
    });
});