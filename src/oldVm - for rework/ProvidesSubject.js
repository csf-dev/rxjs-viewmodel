//@flow
export interface ProvidesSubject<T> {
    +subject : rxjs$Subject<T>;
}