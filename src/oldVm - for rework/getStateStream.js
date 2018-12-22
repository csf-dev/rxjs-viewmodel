//@flow
import type { StreamSource } from './StreamSource';
import { ProvidesMutable } from './ProvidesMutable';
import { ProvidesValue } from './ProvidesValue';
import { ProvidesSubject } from './ProvidesSubject';
import { BehaviorSubject } from 'rxjs';

function getMutableStream<T>(provider : ProvidesMutable<T>) : BehaviorSubject<?T> {
    return getStaticStream(provider.getCopy());
}

function getValueStream<T>(provider : ProvidesValue<T>) : BehaviorSubject<?T> {
    return getStaticStream(provider.value);
}

function getSubjectStream<T>(provider : ProvidesSubject<T>) : BehaviorSubject<?T> {
    return getSubscribableStream(provider.subject);
}

function getSubscribableStream<T>(provider : rxjs$Subscribable<T>) : BehaviorSubject<?T> {
    const subject = new BehaviorSubject<?T>(undefined);
    provider.subscribe(subject);
    return subject;
}

function getPromiseStream<T>(provider : Promise<T>) : BehaviorSubject<?T> {
    const subject = new BehaviorSubject<?T>(undefined);
    provider.then(val => subject.next(val));
    return subject;
}

function getStaticStream<T>(value : T) : BehaviorSubject<?T> {
    return new BehaviorSubject<?T>(value);
}

export default function getStateStream<T>(provider : StreamSource<T>) : BehaviorSubject<?T> {
    if(provider instanceof Promise)
        return getPromiseStream<T>(provider);

    const duckTypedProvider : any = provider;

    if(duckTypedProvider.subject)
        return getSubjectStream<T>(duckTypedProvider);

    if(typeof duckTypedProvider.subscribe === 'function')
        return getSubscribableStream<T>(duckTypedProvider);

    if(duckTypedProvider.value)
        return getValueStream<T>(duckTypedProvider);

    if(typeof duckTypedProvider.getCopy === 'function')
        return getMutableStream<T>(duckTypedProvider);

    return getStaticStream<T>(duckTypedProvider);
}