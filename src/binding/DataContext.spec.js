//@flow
import DataContext from './DataContext';

describe('The DataContext class', () => {
    let sut : DataContext;

    beforeEach(() => {
        sut = new DataContext({ number: 5, obj: { foo: 'bar' } });
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

            var result = sut.getChild();

            expect(result.get('key1')).toBe(5);
            expect(result.get('key2')).toBe(6);
        });

        it('should create a child which is unaffected by subsequent changes to the parent', () => {
            sut.set('key1', 5);
            sut.set('key2', 6);

            var result = sut.getChild();
            sut.set('key3', 7)

            expect(result.get('key1')).toBe(5);
            expect(result.get('key2')).toBe(6);
            expect(result.get('key3')).toBeUndefined();
        });

        it('should be able to shadow variables from the parent', () => {
            sut.set('key1', 5);
            sut.set('key2', 6);

            var result = sut.getChild();
            result.set('key2', 7)

            expect(result.get('key1')).toBe(5);
            expect(result.get('key2')).toBe(7);
        });

        it('should not be able to redefine variables present upon its parent', () => {
            sut.set('key1', 5);
            sut.set('key2', 6);

            var result = sut.getChild();
            result.set('key2', 7)

            expect(result.get('key1')).toBe(5);
            expect(sut.get('key2')).toBe(6);
        });
    });
});