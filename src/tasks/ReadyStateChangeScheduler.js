//@flow
import type { Scheduler } from './Scheduler';
import { MissingBrowserError } from '../errors/MissingBrowserError';

/* This scheduler should support Internet Explorer versions 6 through
 * 10. It uses an onreadystatechange JavaScript event upon an HTML
 * <script> element to detect that an HTML manipulation has taken
 * place.
 *
 * It functions by appending the script element to the document element,
 * listening for the onreadystatechange event and then (when that event
 * fires), resolving the promise and cleaning up (by removing the script).
 */

function getDocumentElement() : HTMLElement {
    if(!document.documentElement) throw new MissingBrowserError('The document must have a root element');
    return document.documentElement;
}

export default function tryGetReadyStateChangeScheduler() : ?Scheduler {
    if(!window || !window.document || !('onreadystatechange' in document.createElement('script')))
        return null;

    return function() {
        const script = document.createElement('script');

        return new Promise((resolve, reject) => {
            const doc = getDocumentElement();
            script.onreadystatechange = () => {
                script.onreadystatechange = null;
                doc.removeChild(script);
                resolve();
            };
            doc.appendChild(script);
        });
    }
}
