//@flow
import { ActivatorRegistry } from './ActivatorRegistry';
import { BindingContext } from '../binding';
import { BindingActivator } from '../binding/BindingActivator';

describe('The activator registry', () => {
    it('should be able to add an activator', async () => {
        const activator = getActivator('foo');
        const sut = new ActivatorRegistry();

        sut.add(activator);

        expect(await sut.getActivator('foo')).toBe(activator);
    });

    it('should be able to add an activator with an altenative name', async () => {
        const activator = getActivator('foo');
        const sut = new ActivatorRegistry();

        sut.add(activator, 'bar');

        expect(await sut.getActivator('bar')).toBe(activator);
    });

    it('should throw an error when trying to retrieve an activator using its original name, if it was added with an alternative name', () => {
        const activator = getActivator('foo');
        const sut = new ActivatorRegistry();

        sut.add(activator, 'bar');

        expect(() => sut.getActivator('foo')).toThrowError('There must be a registered activator with the name "foo".');
    });

    it('should throw an error when trying to retrieve an activator which was not added', () => {
        const sut = new ActivatorRegistry();

        expect(() => sut.getActivator('foo')).toThrowError('There must be a registered activator with the name "foo".');
    });

    it('should throw an error when trying to add two activators using the same name', () => {
        const activator1 = getActivator('foo');
        const activator2 = getActivator('bar');
        const sut = new ActivatorRegistry();

        sut.add(activator1);

        expect(() => sut.add(activator2, 'foo')).toThrowError(`An activator named "foo" is already registered; do not register the same activator twice.
If this is a distinct activator then consider registering using an alternative name.`);
    });

    it('should be able to get a collection of all of the registered activators', () => {
        const activator1 = getActivator('foo');
        const activator2 = getActivator('bar');
        const sut = new ActivatorRegistry();

        sut.add(activator1);
        sut.add(activator2);

        const result = sut.getAll();

        expect(result.size).toEqual(2);
    });

    it('should be able to remove an activator by identifier', () => {
        const activator = getActivator('foo');
        const sut = new ActivatorRegistry();

        sut.add(activator);
        sut.remove('foo');

        expect(sut.getAll().size).toBe(0);
    });

    it('should be able to remove an activator by instance', () => {
        const activator = getActivator('foo');
        const sut = new ActivatorRegistry();

        sut.add(activator);
        sut.remove(activator);

        expect(sut.getAll().size).toBe(0);
    });

    it('should not raise an exception trying to remove an activator which was not added', () => {
        const sut = new ActivatorRegistry();

        expect(() => sut.remove('foo')).not.toThrowError();
    });

    function getActivator(name : string = 'foo') : BindingActivator<mixed> {
        return { name: name, activate: (ctx : BindingContext<mixed>) => {} };
    }
});