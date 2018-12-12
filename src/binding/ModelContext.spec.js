//@flow
import getModelContext, { ModelContext } from './ModelContext';

describe('The ModelContext class', () => {
    let sut : ModelContext;

    beforeEach(() => {
        sut = getModelContext({ number: 5, obj: { foo: 'bar' } });
    });

    describe('when setting & getting variables', () => {
        it('should be able to set and get a number', () => {
            sut.set('key', 5);
            const result = sut.get<number>('key');
            expect(result).toBe(5);
        });

        it('should be able to set and get a string', () => {
            sut.set('key', 'My string');
            const result = sut.get<string>('key');
            expect(result).toBe('My string');
        });

        it('should be able to get a number unsafely', () => {
            sut.set('key', 'My string');
            const result = sut.get<number>('key');
            expect(typeof result).toBe('string');
        });

        it('should return undefined for variables which do not exist', () => {
            const result = sut.get('key');
            expect(result).toBeUndefined();
        });
    });

    describe('when creating a child context', () => {
        it('should have the same variables as the parent', () => {
            sut.set('key1', 5);
            sut.set('key2', 6);

            var result = sut.createChild();

            expect(result.get('key1')).toBe(5);
            expect(result.get('key2')).toBe(6);
        });

        it('should create a child which receives changes made to the parent', () => {
            var child = sut.createChild();

            sut.set('key3', 7)

            expect(child.get('key3')).toBe(7);
        });

        it('should create a child which may shadow values in its parent', () => {
            var child = sut.createChild();

            child.set('key3', 8);
            sut.set('key3', 7)

            expect(child.get('key3')).toBe(8);
        });

        it('should not be able to redefine variables present upon its parent', () => {
            var child = sut.createChild();

            sut.set('key2', 6);
            child.set('key2', 7)

            expect(sut.get('key2')).toBe(6);
        });
    });
});