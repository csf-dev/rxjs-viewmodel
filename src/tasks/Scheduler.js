//@flow
import tryGetMutationObservableScheduler from './MutationObserverScheduler';
import tryGetReadyStateChangeScheduler from './ReadyStateChangeScheduler';
import getSetTimeoutScheduler from './SetTimeoutScheduler';

/* The scheduler is used to schedule 'tasks' (usually changes to the DOM) asynchronously
 * with executing JavaScript code. The scheduler itself is a function which
 * returns a promise.  That promise resolves when the 'tasks' are ready to be executed.
 *
 * The strategy for resolving that promise is 'as soon as is reasonably possible' but
 * after the browser has finished executing its current synchronous workload
 * and - ideally - when it is ready to make changes to the DOM.
 *
 * The rationale for this is to avoid the potential 'churn' involved in making
 * synchronous DOM changes, which could be re-evaluated many times.  Essentially the
 * scheduler allows us to 'batch' those DOM changes and make them all together, once
 * synchronous code has finished executing.
 */
export type Scheduler = () => Promise<mixed>;

/* There are a few available algorithms for the scheduler.
 * This function picks and returns the 'best' one based upon
 * the browser's available support.
 */
export default function getScheduler() : Scheduler {
    return tryGetMutationObservableScheduler()
           || tryGetReadyStateChangeScheduler()
           || getSetTimeoutScheduler();
}