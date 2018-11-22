//@flow

export interface ProvidesObservableValue<+T : mixed> {
    +valueSubject : rxjs$Observable<T>;
}