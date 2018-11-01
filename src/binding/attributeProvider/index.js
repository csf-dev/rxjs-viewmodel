//@flow
import { GetsBindings } from '../GetsBindings';
import type { Binding } from '../Binding';

const provider : GetsBindings = {
    getBindings: function(element : HTMLElement) : Array<Binding> {
        throw new Error('Not implemented');
    }
};

function getProvider() { return provider; }

export { getProvider };