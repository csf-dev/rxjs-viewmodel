//@flow
import { SubstitutesElement } from './ElementPlaceholder';

export interface ProvidesBindingMarkup {
    +isRoot : bool;
    +element : HTMLElement;
    +placeholder : SubstitutesElement;
    omitTag : bool;
    remove : bool;
}