//@flow
import type { Scheduler } from './Scheduler';

/* This scheduler should support the following browsers:
 * * Chrome 27+
 * * Firefox 14+
 * * IE 11+
 * * Opera 15+
 * * Safari 6.1+
 * 
 * It uses a MutationObserver built-in JavaScript object to detect
 * when DOM manipulation has occurred.
 *
 * It then uses an in-memory HTML <div> element and changes the state
 * of one of its attributes, triggering a mutation, which resolved the
 * promise.
 */

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