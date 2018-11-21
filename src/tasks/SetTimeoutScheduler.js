//@flow
import type { Scheduler } from './Scheduler';

/* This scheduler should support all known JavaScript-capable browsers.
 * It uses the least-desirable algorithm and so it should be used as a
 * fall-back option when other schedulers cannot be used.
 *
 * By using setTimeout, the promise should resolve once the JavaScript
 * queue of pending 'things to run' has cleared.
 */

export default function getSetTimeoutScheduler() : Scheduler {
    return function() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 0);
        });
    }
}