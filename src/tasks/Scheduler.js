//@flow
import tryGetMutationObservableScheduler from './MutationObservableScheduler';
import tryGetReadyStateChangeScheduler from './ReadyStateChangeScheduler';
import getSetTimeoutScheduler from './SetTimeoutScheduler';

/* The scheduler is used to schedule 'tasks' (usually changes to the DOM) asynchronously,
 * but on an 'as soon as possible' basis.
 * 
 * There are a few available algorithms to do this, the function below picks and returns
 * the best one based upon the browser's available support.
 */

export type Scheduler = () => Promise<mixed>;

export default function getScheduler() : Scheduler {
    return tryGetMutationObservableScheduler()
           || tryGetReadyStateChangeScheduler()
           || getSetTimeoutScheduler();
}