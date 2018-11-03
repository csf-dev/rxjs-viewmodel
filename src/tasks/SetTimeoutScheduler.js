//@flow
import type { Scheduler } from './Scheduler';

export default function getSetTimeoutScheduler() : Scheduler {
    return function() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 0);
        });
    }
}