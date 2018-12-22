//@flow
import { ProvidesSubject } from './ProvidesSubject';

function getPropertyDescriptor<TVal,TVmVal : ProvidesSubject<TVal>>(vmValue : TVmVal) : PropertyDescriptor<TVmVal> {
    return {
        configurable: true,
        enumerable: true,
        get: () => vmValue
    };
}

export default getPropertyDescriptor;