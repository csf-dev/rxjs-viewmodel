//@flow

export type ProvidesValue<T> = T | Promise<T> | rxjs$Observable<T>;