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

            const result = sut.createChild();

            expect(result.get('key1')).toBe(5);
            expect(result.get('key2')).toBe(6);
        });

        it('should create a child which receives changes made to the parent', () => {
            const child = sut.createChild();

            sut.set('key3', 7)

            expect(child.get('key3')).toBe(7);
        });

        it('should create a child which may shadow values in its parent', () => {
            const child = sut.createChild();

            child.set('key3', 8);
            sut.set('key3', 7)

            expect(child.get('key3')).toBe(8);
        });

        it('should not be able to redefine variables present upon its parent', () => {
            const child = sut.createChild();

            sut.set('key2', 6);
            child.set('key2', 7)

            expect(sut.get('key2')).toBe(6);
        });
    });

    describe('when getting an observable variable', () => {
        it('should emit a value which existed before the subscription', () => {
            let fromSub : number;
            sut.set('key1', 5);

            const sub = sut.getObservable<number>('key1')
                .subscribe(val => fromSub = val);

            expect(fromSub).toBe(5);
        });

        it('should be undefined if no value has been set', () => {
            let fromSub : ?number;

            const sub = sut.getObservable<number>('key1')
                .subscribe(val => fromSub = val);

            expect(fromSub).toBeUndefined();
            sub.unsubscribe();
        });

        it('should emit an ongoing stream of values', () => {
            const fromSub : Array<number> = [];
            const sub = sut.getObservable<number>('key1')
                .subscribe(val => fromSub.push(val));

            sut.set('key1', 3);
            sut.set('key1', 4);
            sut.set('key1', 5);

            expect(fromSub).toEqual([undefined, 3, 4, 5]);
            sub.unsubscribe();
        });

        it('should not emit values overridden in a parent context', () => {
            const fromSub : Array<number> = [];
            const child = sut.createChild();
            const sub = child.getObservable<number>('key1')
                .subscribe(val => fromSub.push(val));

            child.set('key1', 3);
            sut.set('key1', 4);

            expect(fromSub.slice(1).every(item => item == 3)).toBeTruthy();
            sub.unsubscribe();
        });

        xit('should not emit unnecesary values due to irrelevant changes in an overridden parent context', () => {
            const fromSub : Array<number> = [];
            const child = sut.createChild();
            const sub = child.getObservable<number>('key1')
                .subscribe(val => fromSub.push(val));

            child.set('key1', 3);
            sut.set('key1', 4);
            sut.set('key1', 5);

            expect(fromSub.length).toBe(2);
            sub.unsubscribe();
        });
    });

    describe('when getting all values as an observable', () => {
        it('should emit an ongoing stream of values', () => {
            const fromSub : Array<number> = [];
            const sub = sut.getAllObservable()
                .subscribe(val => fromSub.push(val.map.size));

            sut.set('key1', 3);
            sut.set('key2', 4);
            sut.set('key3', 5);

            expect(fromSub).toEqual([0, 1, 2, 3]);
            sub.unsubscribe();
        });

        it('should emit an ongoing stream of values', () => {
            const fromSub : Array<Map<string,number>> = [];
            const sub = sut.getAllObservable()
                .subscribe(val => fromSub.push(new Map<string,number>(val.map.entries())));

            sut.set('key1', 3);
            sut.set('key2', 4);
            sut.set('key3', 5);

            expect(fromSub).toEqual([
                new Map(),
                new Map([['key1', 3]]),
                new Map([['key1', 3], ['key2', 4]]),
                new Map([['key1', 3], ['key2', 4], ['key3', 5]]),
            ]);
            sub.unsubscribe();
        });

        it('should not emit values overridden in a parent context', () => {
            const fromSub : Array<Map<string,number>> = [];
            const child = sut.createChild();
            const sub = child.getAllObservable()
                .subscribe(val => fromSub.push(new Map<string,number>(val.map.entries())));

            child.set('key1', 3);
            sut.set('key1', 4);

            expect(fromSub.reverse()[0]).toEqual(new Map([['key1', 3]]));
            sub.unsubscribe();
        });

        xit('should not emit unnecesary values due to irrelevant changes in an overridden parent context', () => {
            const fromSub : Array<Map<string,number>> = [];
            const child = sut.createChild();
            const sub = child.getAllObservable()
                .subscribe(val => fromSub.push(new Map<string,number>(val.map.entries())));

            child.set('key1', 3);
            sut.set('key1', 4);
            sut.set('key1', 5);

            expect(fromSub.length).toBe(2);
            sub.unsubscribe();
        });
    });
});