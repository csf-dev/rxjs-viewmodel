//@flow
import { ProvidesMutable } from './ProvidesMutable';
import { ProvidesValue } from './ProvidesValue';
import { ProvidesSubject } from './ProvidesSubject';

export type StreamSource<T> = ProvidesMutable<T>
                              | ProvidesValue<T>
                              | ProvidesSubject<T>
                              | rxjs$Subscribable<T>
                              | Promise<T>
                              | T;