//@flow
import type { Scheduler } from './Scheduler';

export default function tryGetMutationObserverScheduler() : ?Scheduler {
    if(!window || !window.document || !window['MutationObserver']) return null;

    return function() {
        const mutableElement = document.createElement('div');

        return new Promise((resolve, reject) => {
            const elementObserver = new MutationObserver(() => resolve());
            elementObserver.observe(mutableElement, { attributes: true });
            mutableElement.classList.toggle("foo");
        });
    }
}